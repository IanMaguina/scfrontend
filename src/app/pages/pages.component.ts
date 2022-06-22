import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {
  
  title = 'scfrontend';
  funcion:boolean = false;
  

  hideSidebar() {
    this.funcion = true;
  }
  showSidebar() {
    this.funcion = false;
  }

  @Output() sidenavLayoutToggle = new EventEmitter<boolean>();

  openMenu = true;
  
  clickMenu() {
    this.openMenu = !this.openMenu;
    this.sidenavLayoutToggle.emit(this.openMenu);
  }


}