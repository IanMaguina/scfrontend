import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { client, ClientSap, CondicionPago } from '../../interfaces';
import { GlobalSettings } from 'src/app/shared/settings';
import { AutenticacionService } from '@services/autenticacion.service';
import { CondicionPagoService } from '@services/condicion-pago.service';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-detalle-condicion-pago',
  templateUrl: './detalle-condicion-pago.component.html',
  styleUrls: ['./detalle-condicion-pago.component.css']
})
export class DetalleCondicionPagoComponent implements OnInit {

  public formTemplate: FormGroup;
  public dataSource!: MatTableDataSource<any>;
  public society$: Observable<ClientSap[]>;
  public conditionPayment$: Observable<CondicionPago[]>;
  public condicionPagoDetalle$: Observable<any>;
  public client: client = {} as client;
  public displayedColumns: string[] = ['productos', 'condicion_pago_regular', 'condicion_pago_actual', 'nueva_condicion_pago', 'fecha_limite'];
  private id!: number;
  private rolCondicionPago!: number;
  private idUser!: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly autenticacionService: AutenticacionService,
    private readonly condicionPagoService: CondicionPagoService,
    private readonly snackBService: SnackBarService) { }

  ngOnInit(): void {
    this.getRole();
    this.initForm();
    this.getSociety();
    this.getSolicitudCondicionPagoDetalle();

  }

  private initForm() {
    this.formTemplate = this.formBuilder.group({
      sociedad: [{ value: '', disabled: true }],
      codigo_sap: [{ value: '', disabled: true }],
      linea_producto: [{ value: '', disabled: true }],
      observacion: [{ value: '', disabled: true }]
    });
  }

  private getSolicitudCondicionPagoDetalle() {
    this.activatedRoute.params
      .pipe(
        tap(({ id }) => this.id = id),
        switchMap(({ id }) => this.condicionPagoService.getCondicionPagoClienteDetalle(id)),
        tap((request) => {
          this.condicionPagoDetalle$ = request;
          this.formTemplate.patchValue({
            sociedad: request.sociedad_codigo_sap,
            codigo_sap: request.cliente_codigo_sap,
            observacion: request.observacion
          })
        }),
        switchMap(({ sociedad_codigo_sap, grupo_cliente_codigo_sap }) => this.getConditionPayment(sociedad_codigo_sap, grupo_cliente_codigo_sap)),
        tap((_) => this.getClientSap()),
        switchMap((_) => this.getCondicionPagoClienteDetalleSolicitud()))
      .subscribe();
  }

  private getClientSap() {
    const { sociedad, codigo_sap } = this.formTemplate.getRawValue();

    const params: Object = {
      clientes: [
        { sociedad_codigo_sap: sociedad, cliente_codigo_sap: codigo_sap },
      ]
    }

    return this.condicionPagoService.getClientSap(params).pipe(
      tap((request) => {

        const [client] = request.clientes;

        this.client = {
          sociedad: client.sociedad_codigo_sap,
          codigo_sap: client.cliente_codigo_sap,
          ruc: client.numero_documento,
          razon_social: client.razon_social,
          grupo_cliente: client.grupo_cliente_codigo_sap,
          canal_comercial: '',
          zonal: client.zonal_codigo_sap
        }

      })
    ).subscribe();
  }

  private getConditionPayment(sociedad: string, grupo_cliente: string) {

    const params = new HttpParams()
      .set('sociedad_codigo_sap', sociedad)
      .set('grupo_cliente_codigo_sap', grupo_cliente);

    return this.condicionPagoService.getConditionPayment(params).pipe(
      tap((request) => this.conditionPayment$ = of(request))
    )
  }

  private getCondicionPagoClienteDetalleSolicitud() {

    const params = new HttpParams().set('id_condicion_pago_cliente', `${this.id}`);

    return this.condicionPagoService.getCondicionPagoClienteDetalleSolicitud(params).pipe(
      tap((request) => {
        const lineaProductoSolicitud = request.map((data) => ({ ...data }));
        this.dataSource = new MatTableDataSource(lineaProductoSolicitud);
      })
    )
  }

  private getSociety() {
    this.society$ = this.condicionPagoService.getSociety();
  }

  private getRole() {
    const { sociedad: { id_rol, id_usuario } } = this.autenticacionService.getUserInfo();
    this.rolCondicionPago = id_rol;
    this.idUser = id_usuario;
  }

  public onAssignConditionPaymentClient() {

    if (this.rolCondicionPago == GlobalSettings.ROL_CONDICION_PAGO_SOLICITANTE) {
      this.onSendEvaluationConditionPaymentClient();
    }

    if ([GlobalSettings.ROL_CONDICION_PAGO_EVALUADOR, 
         GlobalSettings.ROL_CONDICION_PAGO_APROBADOR, 
         GlobalSettings.ROL_CONDICION_PAGO_ACTIVADOR].includes(this.rolCondicionPago)) {
      this.onApproveConditionPaymentClient();
    }

  }

  private onSendEvaluationConditionPaymentClient() {
    this.condicionPagoService.sendEvaluationConditionPaymentClient(this.id).pipe(
      tap((request) => {

        if (request) {
          //this.snackBService.openSnackBar('La solicitud ha sido enviada', 'cerrar');
          return;
        }

        //this.snackBService.openSnackBar('Ha ocurrido un error al intentar enviar la solicitud', 'cerrar');

      })).subscribe();
  }

  private onApproveConditionPaymentClient() {

    const params: Object = {
      id_usuario: this.idUser
    }

    this.condicionPagoService.approveConditionPaymentClient(this.id,params).pipe(
      tap((request) => {

        if (request) {
          //this.snackBService.openSnackBar('La solicitud ha sido enviada', 'cerrar');
          return;
        }

        //this.snackBService.openSnackBar('Ha ocurrido un error al intentar enviar la solicitud', 'cerrar');

      })).subscribe();
  }

  public onRejectingConditionPaymentClient() {

    const params: Object = {
      id_usuario: this.idUser,
      motivo_rechazo: ''
    }

    this.condicionPagoService.rejectingConditionPaymentClient(this.id, params).pipe(
      tap((request) => {

        if (request) {
          //this.snackBService.openSnackBar('La solicitud ha sido enviada', 'cerrar');
          return;
        }

        //this.snackBService.openSnackBar('Ha ocurrido un error al intentar enviar la solicitud', 'cerrar');

      })).subscribe();
  }

}
