import { Component, EventEmitter, Output} from '@angular/core';
import { AutenticacionService } from '@services/autenticacion.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {
  
  title = 'scfrontend';
  funcion:boolean = false;
  
  constructor(
    private autenticacionService: AutenticacionService
  ){
    
  }

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