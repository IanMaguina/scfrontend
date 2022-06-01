import { SolicitudPlanCondicionPagoDTO } from './../../../../../dto/solicitud-plan-condicion-pago.dto';
import { SolicitudPlanService } from './../../../../../services/solicitud-plan.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoValoradoService } from 'src/app/services/documento-valorado.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { LineaProductoService } from 'src/app/services/linea-producto.service';
import { PlanService } from 'src/app/services/plan.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service'; 
import { GlobalSettings } from 'src/app/shared/settings';
import { SolicitudPlan } from 'src/app/models/solicitud-plan.interface';
import { SolicitudPlanDocumentoValoradoDTO } from 'src/app/dto/solicitud-plan-documento-valorado.dto';
import { DlgSolicitudCondicionPagoComponent } from '../dlg-solicitud-condicion-pago/dlg-solicitud-condicion-pago.component';




@Component({
  selector: 'app-dlg-nuevo-plan-sc',
  templateUrl: './dlg-nuevo-plan-sc.component.html',
  styles: [
  ]
})
export class DlgNuevoPlanScComponent implements OnInit {

  displayedColumnsDocumentoValorado: string[] = ['nombre', 'importe'];


  displayedColumnsLineaProducto: string[] = ['codigo_sap', 'nombre'];



  solicitudData: any;
  id_solicitud_editar: any;
  listadoTipoLinea: any[] = [{ id: 1, nombre: "Regular" }, { id: 2, nombre: "Temporal" }];
  listadoPlanesCredito: any[] = [];
  listadoVigencias: any[] = [{ id: 1, nombre: "Pico de demanda" }, { id: 2, nombre: "DV en curso" }, { id: 1, nombre: "Fecha" }];
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
  ) {
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
      linea_producto: [''],
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
    this.listarDocumentosValorados();
    this.listarLineaProductos();
    this.listarMoneda(); 
  }

  listarPlan() {
    this.planService.listarPlan().then(data => {
      this.listadoPlanesCredito = data.payload;
    })
  }

  //Inicio
  listarLineaProductos() {
    this.lineaProductoService.listar().then(data => {
      this.listadoLineaProducto = data.payload;
    })
  }

  async mapeoLineaProducto(data: SolicitudPlanCondicionPagoDTO) {
    let solicitudPlanCondicionPago: SolicitudPlanCondicionPagoDTO = {
      id: data.id,
      id_solicitud_plan: data.id_solicitud_plan,
      id_condicion_pago_linea_producto: data.id_condicion_pago_linea_producto,
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
      id_tipo_documento_valorado: data.id_tipo_documento_valorado,
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


  async agregar(form: any) {
    console.log("solicitud plan-->" + JSON.stringify(form));
    let solicitud: SolicitudPlan = await this.mapeoData(form)
    this.solicitudPlanService.crear(solicitud).then(data => {
      this.onNoClick(data);
    })
  }

  async mapeoData(form: any) {
    let solicitud: SolicitudPlan =
    {
      "id": null,
      "id_solicitud": this.id_solicitud_editar,
      "id_tipo_linea": form.tipo_linea.id,
      "id_plan": form.plan_credito.id,
      "grupo_cliente_codigo_sap": null,
      "id_cliente_agrupacion": null,
      "id_empresa": null,
      "fecha_vigencia": null,
      "id_tipo_moneda": form.moneda.id,
      "importe": form.importe,
      "fecha_inicio": null,
      "fecha_fin": null,
      "comentario": form.informacion_adicional,
      "id_plan_referencia": null,
      "tipo_calculo": null
    }
    return solicitud;
  }

  onNoClick(res: string) {
    this.dialogRef.close(res);
  }

  solicitarNuevaCondicionPago(){
    let data= {
      arrayProductos : this.formulary.get('lineaProductosArray'),
      id_solicitud:this.id_solicitud_editar
    }

    const dialogRef = this.matDialog.open(DlgSolicitudCondicionPagoComponent, {
      disableClose: true,
      width:"750px",
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'CONFIRM_DLG_YES'){
        
        console.log("se agregó el plan correctamente");
      }
    }); 
  }
}
