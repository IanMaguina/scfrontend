import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalSettings } from '../shared/settings';
import { Messages } from '../shared/messages';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthTokenURL = GlobalSettings.BASE_API_URL + "/oauth/token";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    console.log("constructor... AuthService");

  }


  obtainAccessToken(loginData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      let params = new URLSearchParams();
      params.append('username', loginData.username);
      params.append('password', loginData.password);
      params.append('grant_type', 'password');
      params.append('client_id', GlobalSettings.CLIENT_ID);

      let authorization = btoa(GlobalSettings.CLIENT_ID + ":" + GlobalSettings.CLIENT_KEY);
      console.log("params=" + params);
      console.log("authorization=" + authorization);

      let headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + authorization });
      let options = { headers: headers };
      console.log(params.toString());
      this.http.post(this.oauthTokenURL, params.toString(), options)
        .pipe(
          map(res => res)
        ).toPromise().then(
          data => {
            this.saveToken(data)
            resolve('OK');
          }
        ).catch(
          err => {
            //alert('Invalid Credentials')
            console.log("error=" + JSON.stringify(err));
            if (err.status == 400) {
              reject(Messages.error.MSG_ERROR_INVALID_CREDENTIALS);
            } else {
              reject(Messages.error.MSG_ERROR_SERVER);
            }

          }
        );

    });

  }

  obtainRefreshToken(): Promise<any> {

    return new Promise((resolve, reject) => {

      let params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', this.cookieService.get('refresh_token'));
      params.append('client_id', GlobalSettings.CLIENT_ID);

      let authorization = btoa(GlobalSettings.CLIENT_ID + ":" + GlobalSettings.CLIENT_KEY);
      console.log("params=" + params);
      console.log("authorization=" + authorization);

      let headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + authorization });
      let options = { headers: headers };
      console.log(params.toString());
      this.http.post(this.oauthTokenURL, params.toString(), options)
        .pipe(
          map(res => res)
        ).toPromise().then(
          data => {
            this.saveToken(data)
            //resolve(data["access_token"]);
            resolve(this.getRefreshToken());
          }
        ).catch(
          err => {
            //alert('Invalid Credentials')
            console.log("error=" + JSON.stringify(err));
            if (err.status == 400) {
              reject(Messages.error.MSG_ERROR_INVALID_CREDENTIALS);
            } else {
              reject(Messages.error.MSG_ERROR_SERVER);
            }
          }
        );

    });


  }

  saveToken(token: any) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.put("access_token", token.access_token);
    console.log('Obtained Access token and expires in ' + expireDate);

    let refreshToken = token.refresh_token;
    let rtPayload = JSON.parse(atob(refreshToken.split(".")[1]));
    console.log("refresh token payload=" + JSON.stringify(rtPayload));
    let rtExpDate = rtPayload['exp'];
    this.cookieService.put("refresh_token", token.refresh_token);
  }

  getAccessToken() {
    return this.cookieService.get('access_token');
  }

  getRefreshToken() {
    return this.cookieService.get('refresh_token');
  }

  validateRefreshToken() {
    console.log("check refresh token...");
    if (this.cookieService.get('refresh_token') != null) { //era check
      console.log("refresh token is valid...");
      return true;
    }
    return false;
  }

  removeAccessToken() {
    this.cookieService.remove('access_token');
  }

  removeRefreshToken() {
    this.cookieService.remove('refresh_token');
  }
}
