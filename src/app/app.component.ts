import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scfrontend';
  funcion:boolean;
  hideSidebar() {
    this.funcion = true;
  }
  showSidebar() {
    this.funcion = false;
  }


}
