import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  usuarioLogueado: any = SocialUser;
  usuarioSocial: any = SocialUser;
  user: any = SocialUser;
  loggedIn: boolean = false;



  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private autenticacionService: AutenticacionService,
  ) {

  }

  ngOnInit(): void {
    if (this.autenticacionService.isLoggedIn()){
      this.router.navigate(['app/dashboard']);

    }
    this.socialAuthService.authState.subscribe((user) => {

      this.usuarioLogueado = user;
      if (this.usuarioLogueado) {
        this.router.navigate(['app/dashboard']);
      }
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.autenticacionService.signInWithGoogle().then((data) => {
      //aqui hago el proceso
      console.log('la data de loggeo : '+JSON.stringify(data));    
      this.usuarioSocial = data;
      if (data && data.id) {
        this.autenticacionService.loggedIn = true;
        localStorage.setItem('IDLOGIN', 'true')
        this.router.navigate(['app/dashboard']);
      } else {
        this.autenticacionService.loggedIn = false;
      }

    })
  }

  signOut(): void {
    this.socialAuthService.signOut();

  }


}
