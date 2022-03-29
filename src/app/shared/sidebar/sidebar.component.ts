import { Component, Input } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems:any[];
  @Input() collapse:boolean = false;
  constructor(
    private sidebarService: SidebarService
  ) { 
    this.menuItems = this.sidebarService.menu;
    console.log(JSON.stringify(this.menuItems));
  }

}
