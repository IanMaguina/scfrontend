import { Empresa } from 'src/app/models/empresa.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { CondicionPago } from '../pages/solicitud-condicion-pago/interfaces';

import config from 'src/assets/config.json';
import { AutenticacionService } from '@services/autenticacion.service';
import { AppConfigService } from './app-config.service';

@Injectable()

export class CondicionPagoService {

  private readonly api: string = "";//GlobalSettings.BASE_API_URL;
//  private readonly api: string = config.BASE_API_URL;
  private _eventBuscarCondicionPagoSubject = new ReplaySubject<HttpParams>(1);
  public eventBuscarCondicionPago$ = this._eventBuscarCondicionPagoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly autenticacionService: AutenticacionService,
    private appConfig: AppConfigService
  ) {
    var vl_appConfig = this.appConfig.getConfig();
    this.api = vl_appConfig.BASE_API_URL;

  }

  public getSociety(): Observable<any> {
    const url: string = `${this.api}/api/sociedad`;
    return this.http.get(url).pipe(pluck('payload'));
  }

  public getSearchCondicionPagoCliente(params?: HttpParams): Observable<any> {

    const { id } = this.autenticacionService.getUserInfo();

    const url: string = `${this.api}/api/condicion-pago-cliente/buscar?id_usuario_creacion=${id}`;
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

  public getClientSap(params: HttpParams): Observable<Empresa> {
    const url: string = `${this.api}/api/empresa/consulta`;
    return this.http.get(url, { params }).pipe(pluck('payload'));
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

  public approveConditionPaymentClient(id_solicitud_pago: number, params: Object) {
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
