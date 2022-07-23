import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { SideNavService } from '../sidebar/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  @Output() sidenavToggle = new EventEmitter<void>();
  userInfo?: any;
  nombre?:string='';
  constructor(
    private sidenav: SideNavService,
    private router: Router,
    private autenticacionService: AutenticacionService,) 
    { 
      this.userInfo = this.autenticacionService.getUserInfo();
     
  }


onToggleSidenav(){
  this.sidenavToggle.emit();
}


 
}
