import { Injectable } from '@angular/core';
import { AuthService } from './token.service';
import { UsuarioService } from './usuario.service';
import { GoogleLoginProvider,SocialAuthService } from "angularx-social-login";
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  privileges: any;
  loggedIn: boolean = false;


  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private cookieService: CookieService,
    private socialAuthService: SocialAuthService,
  ) {

  }


  signInWithGoogle(): Promise<any> {
    console.log("aqui entro");
    return new Promise((resolve, reject) => {
      //Getting access token
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
        this.usuarioService.listarUsuarioPorFiltros({correo:data.email}).then((u) => {
          this.cookieService.put("_user_session", JSON.stringify(u['payload'][0]));
          console.log("user info was saved...."+JSON.stringify(u['payload'][0]));
          resolve(u['payload'][0]);

        })
      }).catch(err => {
        console.log("Error when loading user info..." + err)
        reject(err);
      });


    });

  }

  signout() {
    this.cookieService.remove("_user_session");
    this.cookieService.remove("_menu_session");
    this.socialAuthService.signOut().then().catch(
      err => {
        console.log("Error al cerrar sesion info..." + err)
      }
    );
    this.loggedIn = false;
    this.authService.removeAccessToken();
    this.authService.removeRefreshToken();
    this.privileges = null;
  }

  getUserInfo() {
    let sessionData = this.cookieService.get("_user_session");
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  }

  getUserMenuInfo() {
    let sessionMenuData = this.cookieService.get("_menu_session");
    if (sessionMenuData) {
      return JSON.parse(sessionMenuData);
    }
    return null;
  }

  isLoggedIn() {
    let sessionData = this.cookieService.get("_user_session");
    console.log('usuario logueado-->'+JSON.stringify(sessionData));
    if (sessionData){
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }

  }

  isLoggedInOLD() {
    return this.authService.validateRefreshToken();
  }

}
