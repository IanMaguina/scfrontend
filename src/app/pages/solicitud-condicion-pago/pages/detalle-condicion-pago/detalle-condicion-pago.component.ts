import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { GlobalSettings } from 'src/app/shared/settings';
import { CondicionPagoService } from '@services/condicion-pago.service';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-detalle-condicion-pago',
  templateUrl: './detalle-condicion-pago.component.html',
  styleUrls: ['./detalle-condicion-pago.component.css']
})
export class DetalleCondicionPagoComponent implements OnInit {

  public formTemplate: FormControl = new FormControl({ value: '', disabled: true });
  public dataSource!: MatTableDataSource<any>;
  public detailConditionPayment$: Observable<any>;
  public displayedColumns: string[] = ['productos', 'condicion_pago_regular', 'condicion_pago_actual', 'nueva_condicion_pago', 'fecha_limite'];
  public stateConditionPayment!: number;
  public stateConditionPaymentCompare!: any;
  private id!: number;
  private idUser!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly condicionPagoService: CondicionPagoService,
    private readonly snackBService: SnackBarService) {
    this.stateConditionPaymentCompare = GlobalSettings;
  }

  ngOnInit(): void {
    this.getActivatedRoute();
  }

  private getActivatedRoute() {
    this.activatedRoute.params
      .pipe(
        tap(({ id }) => this.id = id),
        tap(({ id }) => this.getCondicionPagoClienteDetalle(id)),
        switchMap((_) => this.getCondicionPagoClienteDetalleSolicitud()))
      .subscribe();
  }

  private getCondicionPagoClienteDetalle(id: number) {
    this.detailConditionPayment$ = this.condicionPagoService.getCondicionPagoClienteDetalle(id).pipe(
      tap(({ observacion, id_estado, seguimiento_condicion_pago_cliente: { id_usuario } }) => {
        this.idUser = id_usuario;
        this.stateConditionPayment = id_estado;
        this.formTemplate.patchValue(observacion);
      })
    );
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


  public onSendEvaluationConditionPaymentClient() {
    this.condicionPagoService.sendEvaluationConditionPaymentClient(this.id).pipe(
      tap((request) => {

        if (request) {
          this.snackBService.openSnackBar('La solicitud ha sido enviada', 'cerrar');
          return;
        }

        this.snackBService.openSnackBar('Ha ocurrido un error al intentar enviar la solicitud', 'cerrar');

      })).subscribe();
  }

  public onApproveConditionPaymentClient() {

    const params: Object = {
      id_usuario: this.idUser
    }

    this.condicionPagoService.approveConditionPaymentClient(this.id, params).pipe(
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
      motivo_rechazo: 'Con observaciones de rechazo'
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
