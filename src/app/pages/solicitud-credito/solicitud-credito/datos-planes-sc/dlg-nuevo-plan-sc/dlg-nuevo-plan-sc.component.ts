import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoValoradoService } from 'src/app/services/documento-valorado.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { LineaProductoService } from 'src/app/services/linea-producto.service';
import {PlanService} from 'src/app/services/plan.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-dlg-nuevo-plan-sc',
  templateUrl: './dlg-nuevo-plan-sc.component.html',
  styles: [
  ]
})
export class DlgNuevoPlanScComponent implements OnInit {
  solicitudData:any;
  listadoTipoLinea:any[]=[{id:1,nombre:"Regular"},{id:2,nombre:"Temporal"}];
  listadoPlanesCredito:any[]=[];
  listadoVigencias:any[]=[{id:1,nombre:"Pico de demanda"},{id:2,nombre:"DV en curso"},{id:1,nombre:"Fecha"}];
  listadoLineaProducto:any[]=[];
  listadoDocumentosValorados:any[]=[];
  listadoCondicionesPago:any[]=[];

  listadoMoneda:any[]=[];
  
  LINEA_REGULAR=GlobalSettings.LINEA_REGULAR;
  LINEA_TEMPORAL=GlobalSettings.LINEA_TEMPORAL;

  PICO_DEMANDA=GlobalSettings.PICO_DEMANDA;
  DOCUMENTO_VALORADO_EN_CURSO=GlobalSettings.DOCUMENTO_VALORADO_EN_CURSO;
  FECHA_VIGENCIA_TEMPORAL=GlobalSettings.FECHA_VIGENCIA_TEMPORAL;

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
    private planService:PlanService,
    private documentoValoradoService: DocumentoValoradoService,
    private lineaProductoService: LineaProductoService,
    private tipoMonedaService: TipoMonedaService

  ) {
    this.solicitudData = data;
    this.formulary = this.formBuilder.group({
      tipo_linea: [''],
      moneda: [''],
      reemplazo: [''],
      plan_credito: [''],
      importe: [''],
      vigencia: [''],
      linea_producto: [''],
      documento_valorado: [''],
      informacion_adicional: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
   }

  ngOnInit(): void {
    this.listarPlan();
    this.listarDocumentosValorados();
    this.listarProductos();
    this.listarMoneda();
  }

  listarPlan() {
    this.planService.listarPlan().then(data => {
      this.listadoPlanesCredito = data.payload;
    })
  }

  listarDocumentosValorados() {
    this.documentoValoradoService.listarDocumentosValorados().then(data =>{
      this.listadoDocumentosValorados = data.payload;
    })
  }

  listarProductos(){
    this.lineaProductoService.listar().then(data =>{
      this.listadoLineaProducto = data.payload;
    })
  }

  listarMoneda(){
this.tipoMonedaService.listar().then(data=>{
  this.listadoMoneda =data.payload;
})
  }


  ingresarPlan(form:any){

  }
  onNoClick(res:string){
    this.dialogRef.close(res);
  }

  seteoTipoLinea(){
    let valor=this.formulary.get("tipo_linea").value;
    console.log(JSON.stringify(valor));
  }
}
