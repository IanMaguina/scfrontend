import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { ClientSap, CondicionPago } from '../pages/solicitud-condicion-pago/interfaces';

@Injectable()

export class CondicionPagoService {

  private readonly api: string = this.appConfig.getConfig().BASE_API_URL;
  private _eventBuscarCondicionPagoSubject = new ReplaySubject<HttpParams>(1);
  public eventBuscarCondicionPago$ = this._eventBuscarCondicionPagoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService) { }

  public getSociety(): Observable<any> {
    const url: string = `${this.api}/api/sociedad`;
    return this.http.get(url).pipe(pluck('payload'));
  }

  public getCondicionPagoCliente(params?: HttpParams): Observable<any> {
    const url: string = `${this.api}/api/condicion-pago-cliente`;
    return this.http.get(url,{params}).pipe(pluck('payload'));
  }

  public getClientSap(params: Object): Observable<ClientSap> {
    const url: string = `${this.api}/api/solicitud-cliente/clienteSAP`;
    return this.http.post<ClientSap>(url, params).pipe(pluck('payload'));
  }

  public getConditionPayment(params: HttpParams): Observable<CondicionPago[]> {
    const url: string = `${this.api}/api/condicion-pago`;
    return this.http.get<CondicionPago[]>(url, { params }).pipe(pluck('payload'));
  }

  public addConditionPaymentClient(params: Object): Observable<any> {
    const url: string = `${this.api}/api/condicion-pago-cliente`;
    return this.http.post<any>(url, params).pipe(
      pluck('payload'),
      catchError((_) => of(false)));
  }

  public eventBuscarCondicionPago(params:HttpParams) {
    this._eventBuscarCondicionPagoSubject.next(params);
  }
}
