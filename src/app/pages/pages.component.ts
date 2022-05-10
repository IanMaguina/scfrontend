import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  title = 'scfrontend';
  funcion:boolean = true;
  hideSidebar() {
    this.funcion = true;
  }
  showSidebar() {
    this.funcion = false;
  }
}