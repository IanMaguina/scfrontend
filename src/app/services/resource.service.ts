import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { GlobalSettings } from '../shared/settings';
import { AppConfigService } from './app-config.service';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private apiURL = "";//GlobalSettings.BASE_API_URL;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
    //private cookieService: CookieService
  ) { 
    var vl_appConfig = this.appConfig.getConfig();
    this.apiURL = vl_appConfig.BASE_API_URL;
  }


  getResource(resourceUrl: string): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});
    var headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
    return this.http.get(this.apiURL + resourceUrl, { headers: headers }).pipe(
      //return this.http.get(this.apiURL + resourceUrl).pipe(      
      map((res) => res)
    ).pipe(
      catchError((error: any) => throwError(error || 'Server error'))
    );
  }


  postResource(resourceUrl: string, data: any): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});
    var headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.apiURL + resourceUrl, data, { headers: headers })
      //return this.http.post(this.apiURL + resourceUrl, data )
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }

  postMultipartResource(resourceUrl: string, data: any): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});    
    return this.http.post(this.apiURL + resourceUrl, data)
      //return this.http.post(this.apiURL + resourceUrl, data )
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }

  putResource(resourceUrl: string, data: any): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});
    var headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.put(this.apiURL + resourceUrl, data, { headers: headers })
      //return this.http.put(this.apiURL + resourceUrl, data )
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }

  patchResource(resourceUrl: string, data: any): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});
    var headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.patch(this.apiURL + resourceUrl, data, { headers: headers })
      //return this.http.put(this.apiURL + resourceUrl, data )
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }

  deleteResource(resourceUrl: string, id: any): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});
    var headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.delete(this.apiURL + resourceUrl + "/" + id, { headers: headers })
      //return this.http.delete(this.apiURL + resourceUrl+"/"+id )
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }
  deleteResource2(resourceUrl: string): Observable<any> {
    //var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+this.cookieService.get("access_token")});
    var headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.delete(this.apiURL + resourceUrl , { headers: headers })
      //return this.http.delete(this.apiURL + resourceUrl+"/"+id )
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }

  // Resources without oauth2 token
  headResourceNoAuth(resourceUrl: string): Observable<any> {
    return this.http.head(resourceUrl, { observe: 'response' }).pipe(
      map((res) => res)
    ).pipe(
      catchError((error: any) => throwError(error || 'Server error'))
    );
  }

  postResourceNoAuth(resourceUrl: string, data: any, headers: any): Observable<any> {
    var httpHeaders = new HttpHeaders(headers);
    return this.http.post(this.apiURL + resourceUrl, data, { headers: httpHeaders })
      .pipe(
        map((res) => res)
      ).pipe(
        catchError((error: any) => throwError(error || 'Server error'))
      );
  }

}
