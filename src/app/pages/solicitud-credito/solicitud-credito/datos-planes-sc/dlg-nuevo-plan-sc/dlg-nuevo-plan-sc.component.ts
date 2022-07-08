import { SolicitudPlanCondicionPagoDTO } from './../../../../../dto/solicitud-plan-condicion-pago.dto';
import { SolicitudPlanService } from './../../../../../services/solicitud-plan.service';
import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoValoradoService } from 'src/app/services/documento-valorado.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { LineaProductoService } from 'src/app/services/linea-producto.service';
import { PlanService } from 'src/app/services/plan.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service';
import { GlobalSettings } from 'src/app/shared/settings';
import { SolicitudPlanDocumentoValoradoDTO } from 'src/app/dto/solicitud-plan-documento-valorado.dto';

import { CrearSolicitudCondicionPagoComponent } from 'src/app/pages/solicitud-condicion-pago/pages/crear-solicitud-condicion-pago/crear-solicitud-condicion-pago.component';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { TipoLinea } from 'src/app/models/tipo-linea.interface';
import { AutenticacionService } from '@services/autenticacion.service';
import { Usuario } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-dlg-nuevo-plan-sc',
  templateUrl: './dlg-nuevo-plan-sc.component.html',
  styles: [
  ]
})

export class DlgNuevoPlanScComponent implements OnInit, OnDestroy {

  private grupo_cliente_codigo_sap!: string;
  private id_cliente_agrupacion!: number;
  private id_empresa!: number;
  private destroy$ = new Subject<unknown>();

  displayedColumnsLineaProducto: string[] = ['codigo_sap', 'nombre'];
  //displayedColumnsLineaProducto: string[] = ['codigo_sap', 'nombre', 'valor_nuevo'];
  displayedColumnsDocumentoValorado: string[] = ['nombre', 'importe'];



  solicitudData: any;
  id_solicitud_editar: any;
  listadoTipoLinea: TipoLinea[] = [];
  listadoPlanesCredito: any[] = [];
  listadoPlanesCreditoEmpresa: any[] = [];
  listadoVigencias: any[] = [{ id: 1, nombre: "Pico de demanda" }, { id: 2, nombre: "DV en curso" }, { id: 3, nombre: "Fecha" }];
  listadoLineaProducto: any[] = [];
  listadoLineaProductoSeleccionados: any[] = [];
  listadoDocumentosValorados: any[] = [];
  listadoCondicionesPago: any[] = [];

  mostrarListadoLineaProductoGrilla: any[] = [];
  mostrarListadoDocumentoValoradoGrilla: any[] = [];

  listadoMoneda: any[] = [];

  LINEA_REGULAR = GlobalSettings.LINEA_REGULAR;
  LINEA_TEMPORAL = GlobalSettings.LINEA_TEMPORAL;

  PICO_DEMANDA = GlobalSettings.PICO_DEMANDA;
  DOCUMENTO_VALORADO_EN_CURSO = GlobalSettings.DOCUMENTO_VALORADO_EN_CURSO;
  FECHA_VIGENCIA_TEMPORAL = GlobalSettings.FECHA_VIGENCIA_TEMPORAL;

  formulary: FormGroup;

  formErrors = {
    'tipo_linea': '',
    'moneda': '',
    'reemplazo': '',
    'plan_credito': '',
    'importe': '',
    'vigencia': '',
    'linea_producto': '',
    'documento_valorado': '',
    'informacion_adicional': '',
  }
  validationMessages = {
    'tipo_linea': {
      'required': 'el tipo_linea es requerido.'
    },
    'moneda': {
      'required': 'el moneda es requerido.'
    },
    'reemplazo': {
      'required': 'el reemplazo es requerido.'
    },
    'plan_credito': {
      'required': 'el plan_credito es requerido.'
    },
    'importe': {
      'required': 'el importe es requerido.'
    },
    'vigencia': {
      'required': 'el vigencia es requerido.'
    },
    'linea_producto': {
      'required': 'el linea_producto es requerido.'
    },
    'documento_valorado': {
      'required': 'el documento_valorado es requerido.'
    },
    'informacion_adicional': {
      'required': 'el informacion_adicional es requerido.'
    },
  };
  submitted = false;
  carga: boolean = false;
  checkReemplazoPlan: boolean = false;
  userInfo: any;
  id_usuario: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DlgNuevoPlanScComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private planService: PlanService,
    private documentoValoradoService: DocumentoValoradoService,
    private lineaProductoService: LineaProductoService,
    private tipoMonedaService: TipoMonedaService,
    private solicitudPlanService: SolicitudPlanService,
    private matDialog: MatDialog,
    private autenticacionService: AutenticacionService

  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario=this.userInfo.id;
    this.id_solicitud_editar = data;
    console.log("PENELOPE-->" + JSON.stringify(this.id_solicitud_editar));
    this.formulary = this.formBuilder.group({
      lineaProductosArray: this.formBuilder.array([]),
      tipo_linea: [''],
      moneda: [''],
      reemplazo: [''],
      empresa: [''],
      plan_credito: [''],
      importe: [''],
      vigencia: [''],
      linea_producto: [{ value: '', disabled: true }],
      documento_valorado: [''],
      documentoValoradoArray: this.formBuilder.array([]),
      informacion_adicional: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarPlan();
    this.listarPlanEmpresa();
    this.onChangelistarPlanEmpresa();
    this.listarDocumentosValorados();
    this.listarMoneda();
    this.listarTipoLinea();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  listarPlan() {
    this.planService.listarPlan().then(data => {
      this.listadoPlanesCredito = data.payload;
    })
  }
  listarTipoLinea() {
    this.solicitudPlanService.listarTipoLinea(this.id_solicitud_editar).then(data => {
      this.listadoTipoLinea = data.payload;
    })
  }

  private listarPlanEmpresa() {
    this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(({ payload }) => this.listadoPlanesCreditoEmpresa = payload)
  }

  private onChangelistarPlanEmpresa() {
    this.formulary.get('empresa')?.valueChanges.pipe(
      tap((data) => {

        if (data) {
          console.log("listado-->"+JSON.stringify(data))

          this.lineaProductosArray.controls = [];

          const { id_cliente_agrupacion, id_empresa,
            solicitud: { sociedad_codigo_sap },
            cliente_agrupacion: { grupo_cliente_codigo_sap } } = data;

          this.grupo_cliente_codigo_sap = data.empresa.grupo_cliente_codigo_sap;
          this.id_cliente_agrupacion = id_cliente_agrupacion;
          this.id_empresa = id_empresa;

          this.formulary.controls.linea_producto.enable();
          this.listarLineaProductos(this.userInfo.sociedad_codigo_sap, data.empresa.grupo_cliente_codigo_sap)
          return;
        }

        this.formulary.controls.linea_producto.disable();

      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  listarLineaProductos(sociedad: string, grupo_cliente: string) {
    this.lineaProductoService.listarCondicionPago(sociedad, grupo_cliente)
      .then((data) => this.listadoLineaProducto = data);
  }

  async mapeoLineaProducto(data: SolicitudPlanCondicionPagoDTO) {
    let solicitudPlanCondicionPago: SolicitudPlanCondicionPagoDTO = {
      id_solicitud_plan: data.id_solicitud_plan,
      id_condicion_pago: data.id_condicion_pago,
      valor: data.valor,
      valor_nuevo: data.valor_nuevo,
      fecha_vigencia: data.fecha_vigencia,
      linea_producto: data.linea_producto

    }
    return solicitudPlanCondicionPago;
  }

  llenarLineaProductoGrilla() {
    let lineaProducto = this.formulary.get("linea_producto").value;
    console.log("ARSA-->" + JSON.stringify(lineaProducto));
    this.mostrarListadoLineaProductoGrilla = lineaProducto;
    this.formulary.setControl('lineaProductosArray', this.mapearLineaProducto(lineaProducto));
  }

  mapearLineaProducto(lista: SolicitudPlanCondicionPagoDTO[]): FormArray {
    const valor = lista.map((SolicitudPlanCondicionPagoDTO.asFormGroup));
    return new FormArray(valor);
  }

  get lineaProductosArray(): FormArray {
    return this.formulary.get('lineaProductosArray') as FormArray;
  }

  //fin
  /* comienza Doc valorado */
  listarDocumentosValorados() {
    this.documentoValoradoService.listarDocumentosValorados().then(data => {
      this.listadoDocumentosValorados = data.payload;
    })
  }

  async mapeoDocumentoValorado(data: SolicitudPlanDocumentoValoradoDTO) {
    let solicitudPlanDocumentovalorado: SolicitudPlanDocumentoValoradoDTO = {
      id: data.id,
      id_solicitud_plan: data.id_solicitud_plan,
      nombre: data.nombre,
      id_documento_valorado: data.id_documento_valorado,
      importe: data.importe,
      porcentaje: data.porcentaje

    }
    return solicitudPlanDocumentovalorado;
  }

  llenarDocumentoValoradoGrilla() {
    let documentoValorado = this.formulary.get("documento_valorado").value;
    console.log("cbo DV data -->" + JSON.stringify(documentoValorado));
    this.mostrarListadoDocumentoValoradoGrilla = documentoValorado;
    this.formulary.setControl('documentoValoradoArray', this.mapearDocumentoValorado(documentoValorado));
  }

  mapearDocumentoValorado(lista: SolicitudPlanDocumentoValoradoDTO[]): FormArray {
    const valor = lista.map((SolicitudPlanDocumentoValoradoDTO.asFormGroup));
    return new FormArray(valor);
  }

  get documentoValoradoArray(): FormArray {
    return this.formulary.get('documentoValoradoArray') as FormArray;
  }
  /* D valorados */



  listarMoneda() {
    this.tipoMonedaService.listar().then(data => {
      this.listadoMoneda = data.payload;
    })
  }


  ingresarPlan(form: any) {

  }


  seteoTipoLinea() {
    let valor = this.formulary.get("tipo_linea").value;
    console.log(JSON.stringify(valor));
  }

  private destructuringAssigment(form) {

    const { lineaProductosArray, documentoValoradoArray } = this.formulary.value;

    const params = {
      "id_solicitud": this.id_solicitud_editar,
      "id_tipo_linea": form.tipo_linea.id,
      "id_plan": form.plan_credito.id,
      "grupo_cliente_codigo_sap": this.grupo_cliente_codigo_sap,
      "id_cliente_agrupacion": this.id_cliente_agrupacion,
      "id_empresa": this.id_empresa,
      "fecha_vigencia": null,
      "id_tipo_moneda": form.moneda.id,
      "importe": form.importe,
      "fecha_inicio": null,
      "fecha_fin": null,
      "comentario": form.informacion_adicional,
      "id_plan_referencia": null,
      "tipo_calculo": null,
      "condicion_pago": lineaProductosArray,
      "documento_valorado": documentoValoradoArray
    }

    return params;
  }

  async agregar(form: any) {
    const params = this.destructuringAssigment(form);
    this.solicitudPlanService.crear(params).then(data => {
      if(data.header.exito){
        this.onNoClick('CONFIRM_DLG_YES');
      }
    })
  }

  onNoClick(res: string) {
    this.dialogRef.close(res);
  }

  solicitarNuevaCondicionPago() {
    let data = {
      arrayProductos: this.formulary.get('lineaProductosArray'),
      id_solicitud: this.id_solicitud_editar
    }

    const dialogRef = this.matDialog.open(CrearSolicitudCondicionPagoComponent, {
      disableClose: true,
      width: "750px",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {

        console.log("se agregó el plan correctamente");
      }
    });

  }

}
