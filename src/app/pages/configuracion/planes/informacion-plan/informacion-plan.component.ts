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
    'checkGrupos': '',
    'checkClientes': '',
    'checkTodos': '',
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
    'checkGrupos': {
      'required': 'el grupocliente es requerido.'
    },
    'checkClientes': {
      'required': 'el grupocliente es requerido.'
    },
    'checkTodos': {
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
  checkClientes:boolean = false;
  checkGrupos:boolean = false;
  checkTodos:boolean = false;

  /* listados */
  listadoGrupoCliente:any[] = [];
  listadoClientes:any[] = [];
  listadoNivelesMora:any[] = [
    {id:1,nombre:'A'},
    {id:1,nombre:'B'},
    {id:1,nombre:'C'},
    {id:1,nombre:'D'},
  ];
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
      checkGrupos: [''],
      checkClientes: [''],
      checkTodos: [''],
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
  }
  activarConfiguracion(){
    console.log(JSON.stringify(this.informacionForm['radioConfig']));
  }
  


  guardarSeccionInformacion(form:any){
    console.log("guardarSeccionInformacion");
  }

  listarMora(event:any){
    console.log(JSON.stringify(event));

  }
}
