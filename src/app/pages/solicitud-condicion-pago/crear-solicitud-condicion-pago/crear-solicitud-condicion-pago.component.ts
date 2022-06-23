import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MatTable } from '@angular/material/table';

import { client, ClientSap, CondicionPago } from '../interfaces';
import { CondicionPagoService } from '@services/condicion-pago.service';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-crear-solicitud-condicion-pago',
  templateUrl: './crear-solicitud-condicion-pago.component.html',
  styleUrls: ['./crear-solicitud-condicion-pago.scss']
})
export class CrearSolicitudCondicionPagoComponent implements OnInit, OnDestroy {

  public formTemplate: FormGroup;
  public society$: Observable<ClientSap[]>;
  public conditionPayment$: Observable<CondicionPago[]>;
  public client: client;
  public displayedColumns: string[] = ['productos', 'condicion_pago_regular', 'condicion_pago_actual', 'nueva_condicion_pago', 'fecha_limite'];
  @ViewChild(MatTable) table: MatTable<any>;
  private destroy$ = new Subject<unknown>();

  get lineaProductoTable(): FormArray {
    return this.formTemplate.get('lineaProductoTable') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private condicionPagoService: CondicionPagoService) { }

  ngOnInit(): void {
    this.initForm();
    this.getSociety();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private initForm() {
    this.formTemplate = this.formBuilder.group({
      sociedad: ['6012', [Validators.required]],
      codigo_sap: ['50014506', [Validators.required]],
      linea_producto: [{ value: '', disabled: true }],
      lineaProductoTable: this.formBuilder.array([]),
      observacion: ['']
    });
  }

  public onSearch() {

    const { sociedad, codigo_sap } = this.formTemplate.value;

    const params: Object = {
      clientes: [
        { sociedad_codigo_sap: sociedad, cliente_codigo_sap: codigo_sap },
      ]
    }

    this.condicionPagoService.getClientSap(params).pipe(
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

      }),
      switchMap((_) => this.getConditionPayment())
    ).subscribe();

  }

  public change(event:MatOptionSelectionChange) {

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

    const { observacion, lineaProductoTable } = this.formTemplate.value;

    const params = {
      sociedad_codigo_sap: this.client.sociedad,
      cliente_codigo_sap: this.client.codigo_sap,
      grupo_cliente_codigo_sap: this.client.grupo_cliente,
      observacion: observacion,
      detalle: lineaProductoTable,
      id_usuario: 1
    }

    console.log(params);
    //this.condicionPagoService.addConditionPaymentClient(params).subscribe();

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

    const { sociedad, grupo_cliente } = this.client;

    const params = new HttpParams()
      .set('sociedad_codigo_sap', sociedad)
      .set('grupo_cliente_codigo_sap', grupo_cliente);

    return this.condicionPagoService.getConditionPayment(params).pipe(
      tap((request) => {
        this.formTemplate.controls.linea_producto.enable();
        this.lineaProductoTable.controls = [];
        this.conditionPayment$ = of(request)
      })
    )
  }


}
