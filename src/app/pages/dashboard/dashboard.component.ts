import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
  ) {
    
   }

  ngOnInit(): void {
    console.log("estoy logeado?.. :"+this.autenticacionService.loggedIn);
  //  this.loginAuth();
  }

  loginAuth(){
    if(!this.autenticacionService.loggedIn){
      this.router.navigate(['login']);
    }
  }

}
