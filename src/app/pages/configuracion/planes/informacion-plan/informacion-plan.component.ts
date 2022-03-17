import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-informacion-plan',
  templateUrl: './informacion-plan.component.html',
  styles: [
  ]
})
export class InformacionPlanComponent implements OnInit {

  nombreplan:string ='plan de prueba';
  informacionForm: any;
  
   formErrors = {
    'radioConfig': '',
    'grupocliente': '',
    'cartafianza': '',
    'nivelmora': '',
    'centralRiesgo': '',
    'documentovalorado': '',
    'lineasproducto': '',
    'moneda': '',
    'bolsa': '',
    'camiones': '',
    'revisionmensual': '',
  }
  validationMessages = {
    'radioConfig': {
      'required': 'el grupocliente es requerido.'
    },
    'grupocliente': {
      'required': 'el grupocliente es requerido.'
    },
    'cartafianza': {
      'required': 'el cartafianza es requerido.'
    },
    'nivelmora': {
      'required': 'el nivelmora es requerido.'
    },
    'centralRiesgo': {
      'required': 'el centralRiesgo es requerido.'
    },
    'documentovalorado': {
      'required': 'el documentovalorado es requerido.'
    },
    'lineasproducto': {
      'required': 'el lineasproducto es requerido.'
    },
    'moneda': {
      'required': 'el moneda es requerido.'
    },
    'bolsa': {
      'required': 'el bolsa es requerido.'
    },
    'camiones': {
      'required': 'el camiones es requerido.'
    },
    'revisionmensual': {
      'required': 'el revisionmensual es requerido.'
    },
  }; 
  //Submitted form
  submitted = false;
  carga: boolean = false;

  /* validar tipo seleccion grupo o cliente */
  tipoConfiguracion:string = 'grupo';

  /* listados */
  listadoGrupoCliente:any[] = [];
  listadoClientes:any[] = [];
  listadoNivelesMora:any[] = [];
  listadoCentralRiesgo:any[] = [];
  listadoDocumentoValorado:any[] = [];
  listadoLineaProducto:any[] = [];
  listadoMonedaBolsa:any[] = [];
  listadoBolsa:any[] = [];
  listadoCamiones:any[] = [];

  listadoyesno:any[] = [
    {nombre:'sí'},
    {nombre:'no'},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) { 
    this.informacionForm = this.formBuilder.group({
      radioConfig:[''],
      grupocliente: [''],
      cliente: [''],
      cartafianza: ['', Validators.required],
      nivelmora: ['', Validators.required],
      centralRiesgo: ['', Validators.required],
      documentovalorado: ['', Validators.required],
      lineasproducto: ['', Validators.required],
      moneda: ['', Validators.required],
      bolsa: ['', Validators.required],
      camiones: ['', Validators.required],
      revisionmensual: ['', Validators.required], 
    })
     this.informacionForm.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.informacionForm, this.formErrors, this.validationMessages, this.submitted);
    }) 

  }

  ngOnInit(): void {
    console.log("ngOnInit");
    console.log("marcado: "+this.tipoConfiguracion);
  }
  activarConfiguracion(){
    console.log(JSON.stringify(this.informacionForm['radioConfig']));
  }
  


  guardarSeccionInformacion(form:any){
    console.log("guardarSeccionInformacion");
    console.log("marcado: "+this.tipoConfiguracion);
  }
}
