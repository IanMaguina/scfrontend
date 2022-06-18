import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AutenticacionService } from '@services/autenticacion.service';
import { SideNavService } from '../sidebar/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private sidenav: SideNavService,
    private autenticacionService: AutenticacionService,) 
    { 

  }


onToggleSidenav(){
  this.sidenavToggle.emit();
}


  ngOnInit(): void {
  
  }
}
