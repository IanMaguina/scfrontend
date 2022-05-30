import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { MenuNode } from 'src/app/models/menu.interface';
import { SidebarService } from 'src/app/services/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';


@Injectable()
export class SideNavService {
  constructor() { }
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenav.opened = true;
    return this.sidenav.open();
  }

  public close() {
    console.log('close')
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }
}


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




export class SidebarComponent implements OnInit {
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

  @Output() sidenavLayoutToggle = new EventEmitter<boolean>();

  lineadecredito:boolean =false;
  opened:boolean=true;
  isExpanded:boolean=false;
  
  openMenu = false;
  clickMenu() {
    this.openMenu = !this.openMenu;
    this.sidenavLayoutToggle.emit(this.openMenu);
  }
  
  
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
  ) {
    this.dataSource.data = this.sidebarService.menu;

    console.log("los datos son: " + JSON.stringify(this.dataSource.data));
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  this.treeControl.collapseAll();

   this.collapse ? this.treeControl.collapseAll() : console.log("nothing to do");
  }
  
  
  async irUrl(url: any) {
    console.log(url);
await this.router.navigate(['/']);
await this.router.navigateByUrl(url);
  }

 


}

