import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-dlg-nuevo-plan-sc',
  templateUrl: './dlg-nuevo-plan-sc.component.html',
  styles: [
  ]
})
export class DlgNuevoPlanScComponent implements OnInit {
  solicitudData:any;
  listadoTipoLinea:any[]=[];
  listadoPlanesCredito:any[]=[];
  listadoVigencias:any[]=[];
  listadoLineaProducto:any[]=[];
  listadoDocumentosValorados:any[]=[];
  listadoCondicionesPago:any[]=[];

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
  }
  ingresarPlan(form:any){

  }
  onNoClick(res:string){
    this.dialogRef.close(res);
  }
}
