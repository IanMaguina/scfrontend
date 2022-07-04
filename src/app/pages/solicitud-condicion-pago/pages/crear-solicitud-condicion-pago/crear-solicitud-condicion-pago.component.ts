import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MatTable } from '@angular/material/table';

import { client, ClientSap, CondicionPago } from '../../interfaces';
import { CondicionPagoService } from '@services/condicion-pago.service';
import { AutenticacionService } from '@services/autenticacion.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Empresa } from 'src/app/models/empresa.interface';

@Component({
  selector: 'app-crear-solicitud-condicion-pago',
  templateUrl: './crear-solicitud-condicion-pago.component.html',
  styleUrls: []
})
export class CrearSolicitudCondicionPagoComponent implements OnInit {

  public formTemplate: FormGroup;
  public society$: Observable<ClientSap[]>;
  public conditionPayment$: Observable<CondicionPago[]>;
  public client: Empresa = {} as Empresa;
  public displayedColumns: string[] = ['productos', 'condicion_pago_regular', 'condicion_pago_actual', 'nueva_condicion_pago', 'fecha_limite'];
  public minDate = new Date();

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(FormGroupDirective) private formGroupDirective: FormGroupDirective;

  get lineaProductoTable(): FormArray {
    return this.formTemplate.get('lineaProductoTable') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private readonly condicionPagoService: CondicionPagoService,
    private readonly autenticacionService: AutenticacionService,
    private readonly snackBService: SnackBarService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getSociety();
  }

  private initForm() {
    this.formTemplate = this.formBuilder.group({
      sociedad: ['', [Validators.required]],
      codigo_sap: ['', [Validators.required]],
      linea_producto: [{ value: '', disabled: true }],
      lineaProductoTable: this.formBuilder.array([]),
      observacion: ['']
    });
  }

  public onSearch() {

    const { sociedad, codigo_sap } = this.formTemplate.value;

    const params = new HttpParams()
      .set('sociedad_codigo_sap', sociedad)
      .set('cliente_codigo_sap', codigo_sap);

    this.condicionPagoService.getClientSap(params).pipe(
      tap((request) => {
        if (request===null) {
          this.snackBService.openSnackBar('No se encontro recurso', 'cerrar');
          this.onClearForm();
          return;
        }
        this.client=request;
      }),
      switchMap((_) => this.getConditionPayment())
    ).subscribe();

  }

  private onClearForm() {
    this.formTemplate.reset();
    this.formGroupDirective.resetForm();
    this.lineaProductoTable.controls = [];
    this.client = {} as Empresa;
  }

  public change(event: MatOptionSelectionChange) {

    if (event.isUserInput) {

      const { lineaProductoTable } = this.formTemplate.value;

      if (event.source.selected) {

        this.lineaProductoTable.push(this.createForms(event.source.value));

      } else {

        const { id } = event.source.value;

        lineaProductoTable.forEach((item, index, arr) => {
          if (item.id_condicion_pago === id) {
            this.lineaProductoTable.removeAt(index);
          }
        });

      }

      this.table.renderRows();
    }
  }

  public onSendConditionPayment() {

    const { id } = this.autenticacionService.getUserInfo();

    const { observacion, lineaProductoTable } = this.formTemplate.value;

    const params = {
      sociedad_codigo_sap: this.client.sociedad_codigo_sap,
      cliente_codigo_sap: this.client.cliente_codigo_sap,
      grupo_cliente_codigo_sap: this.client.grupo_cliente_codigo_sap,
      id_solicitud: null,
      observacion: observacion,
      detalle: lineaProductoTable,
      id_usuario: id
    }

    this.condicionPagoService.addConditionPaymentClient(params).pipe(
      tap((request) => {

        if (request) {
          this.snackBService.openSnackBar('La solicitud ha sido enviada', 'cerrar');
          this.onClearForm();
          return;
        }

        this.snackBService.openSnackBar('Ha ocurrido un error al intentar enviar la solicitud', 'cerrar');

      })).subscribe();

  }

  private createForms(item): FormGroup {

    return this.formBuilder.group({
      id_condicion_pago: [item.id],
      productos: [item.linea_producto.nombre],
      valor: [item.valor],
      valor_nuevo: [item.valor_nuevo],
      fecha_vigencia: [item.fecha_vigencia]
    });
  }

  private getSociety() {
    this.society$ = this.condicionPagoService.getSociety();
  }

  private getConditionPayment() {
    
    const { sociedad_codigo_sap, grupo_cliente_codigo_sap } = this.client;

    const params = new HttpParams()
      .set('sociedad_codigo_sap', sociedad_codigo_sap)
      .set('grupo_cliente_codigo_sap', grupo_cliente_codigo_sap);

    return this.condicionPagoService.getConditionPayment(params).pipe(
      tap((request) => {
        this.formTemplate.controls.linea_producto.enable();
        this.lineaProductoTable.controls = [];
        this.conditionPayment$ = of(request)
      })
    )
  }

}
