import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';

@Component({
  selector: 'app-cerrar-session',
  templateUrl: './cerrar-session.component.html',
  styles: [
  ]
})
export class CerrarSessionComponent implements OnInit {

  constructor(private router: Router,
    private autenticacionService: AutenticacionService,) { }

  ngOnInit(): void {
    this.logOut();
  }

  logOut(){
    this.autenticacionService.signout();
    this.router.navigate(['login']);
  }
}
