import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router} from '@angular/router';
import { Observer } from 'rxjs';
import { MenuNode } from 'src/app/models/menu.interface';
import { SidebarService } from 'src/app/services/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from './side-nav.service';
import { MatAccordion} from '@angular/material/expansion';

interface ExampleFlatNode {
  expandable?: boolean;
  name: string;
  icono: string;
  url: string;
  level?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})



export class SidebarComponent implements OnInit{
  @Input() collapse: Observer<boolean>;
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icono: node.icono,
      url: node.url,
      level: level,
    };
  };

  lineadecredito: boolean = false;
  opened: boolean = true;
  isExpanded: boolean = false;
  Submenu: boolean
  iconsvg: string[] = [];
  userinfo:any;
  
  
  @ViewChild('sidenav') public sidenav: MatSidenav;

  @Input() sidenavLayout: any;

  @ViewChild(MatAccordion) public IconSideNav: MatAccordion;

  // menuItems: MenuNode[];

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    public sideNavService: SideNavService,
  ) {
    this.dataSource.data = this.sidebarService.menu;
    console.log(this.dataSource.data);
   
    }

      

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    
    
    
    this.treeControl.collapseAll();
    this.collapse ? this.treeControl.collapseAll() : console.log("nothing to do");
    
    this.sideNavService.setSidenav(this.sidenav);
   
  }

  url(url: any) {
    this.router.navigateByUrl(url)
  }


  async irUrl(url: any) {
    console.log(url);
    await this.router.navigate(['/']);
    await this.router.navigateByUrl(url);
  }

}




