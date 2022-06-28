import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { ClientSap, CondicionPago } from '../pages/solicitud-condicion-pago/interfaces';

import config from 'src/assets/config.json';

@Injectable()

export class CondicionPagoService {

  private readonly api: string = config.BASE_API_URL;
  private _eventBuscarCondicionPagoSubject = new ReplaySubject<HttpParams>(1);
  public eventBuscarCondicionPago$ = this._eventBuscarCondicionPagoSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getSociety(): Observable<any> {
    const url: string = `${this.api}/api/sociedad`;
    return this.http.get(url).pipe(pluck('payload'));
  }

  public getCondicionPagoCliente(params?: HttpParams): Observable<any> {
    const url: string = `${this.api}/api/condicion-pago-cliente`;
    return this.http.get(url, { params }).pipe(pluck('payload'));
  }

  public getCondicionPagoClienteDetalle(id: number): Observable<any> {
    const url: string = `${this.api}/api/condicion-pago-cliente/${id}`;
    return this.http.get(url).pipe(pluck('payload'));
  }

  public getCondicionPagoClienteDetalleSolicitud(params?: HttpParams): Observable<any> {
    const url: string = `${this.api}/api/condicion-pago-cliente-detalle`;
    return this.http.get(url, { params }).pipe(pluck('payload'));
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

  public sendEvaluationConditionPaymentClient(id_solicitud_pago) {
    const url: string = `${this.api}/api/condicion-pago-cliente/${id_solicitud_pago}/enviar-a-evaluacion`;
    return this.http.post<any>(url, null).pipe(
      pluck('payload'),
      catchError((_) => of(false)));
  }

  public approveConditionPaymentClient(id_solicitud_pago:number, params: Object) {
    const url: string = `${this.api}/api/condicion-pago-cliente/${id_solicitud_pago}/aprobar`;
    return this.http.post<any>(url, params).pipe(
      pluck('payload'),
      catchError((_) => of(false)));
  }

  public rejectingConditionPaymentClient(id_solicitud_pago: number, params: Object) {
    const url: string = `${this.api}/api/condicion-pago-cliente/${id_solicitud_pago}/rechazar`;
    return this.http.post<any>(url, params).pipe(
      pluck('payload'),
      catchError((_) => of(false)));
  }

  public eventBuscarCondicionPago(params: HttpParams) {
    this._eventBuscarCondicionPagoSubject.next(params);
  }

}
