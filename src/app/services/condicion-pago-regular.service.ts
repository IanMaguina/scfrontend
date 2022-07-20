import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { pluck } from 'rxjs/operators';

import config from 'src/assets/config.json';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})

export class CondicionPagoRegularService {

  private api: string = "";//GlobalSettings.BASE_API_URL;

  //private readonly api: string = config.BASE_API_URL;
  private _eventBuscarCondicionPagoRegularSubject = new ReplaySubject<HttpParams>(1);
  public eventBuscarCondicionPagoRegular$ = this._eventBuscarCondicionPagoRegularSubject.asObservable();

  constructor(private http: HttpClient,
    private appConfig: AppConfigService) { 
      let vl_appConfig = this.appConfig.getConfig();
      this.api = vl_appConfig.BASE_API_URL;
    }

  public getSociedad(): Observable<any[]> {
    const url: string = this.api+"/api/sociedad";
    return this.http.get<any[]>(this.api+"/api/sociedad").pipe(pluck('payload'));
  }

  public getGrupoCliente(): Observable<any[]> {
    const url: string = this.api+"/api/grupo-cliente";
    return this.http.get<any[]>(this.api+"/api/grupo-cliente").pipe(pluck('payload'));
  }

  public getLineaProducto(): Observable<any[]> {
    const url: string = this.api+"/api/linea-producto";
    return this.http.get<any[]>(this.api+"/api/linea-producto").pipe(pluck('payload'));
  }

  public getSearhCondicionPago(params?: HttpParams): Observable<any[]> {
    const url: string = this.api+"/api/condicion-pago/buscar";
    return this.http.get<any[]>(this.api+"/api/condicion-pago/buscarArsa",{ params }).pipe(pluck('payload'));
  }

  public addCondicionPagoRegular(params: Object): Observable<any> {
    const url: string = this.api+"/api/condicion-pago";
    return this.http.post<any>(this.api+"/api/condicion-pago", params );
  }

  public updateCondicionPagoRegular(id:number,params: Object): Observable<any> {
    const url: string = this.api+"/api/condicion-pago/"+id;
    return this.http.put<any>(this.api+"/api/condicion-pago/"+id, params );
  }

  public eventBuscarCondicionPagoRegular(params: HttpParams) {
    this._eventBuscarCondicionPagoRegularSubject.next(params);
  }
}
