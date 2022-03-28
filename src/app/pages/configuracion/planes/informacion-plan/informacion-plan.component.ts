import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CentroRiesgoService } from 'src/app/services/centro-riesgo.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';
import { LineaProductoService } from 'src/app/services/linea-producto.service';
import { NivelMoraService } from 'src/app/services/nivel-mora.service';
import { TipoDocumentoValoradoService } from 'src/app/services/tipo-documento-valorado.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service';

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
  listadoNivelMora:any[] = [];
  listadoCentroRiesgo:any[] = [];
  listadoTipoDocumentoValorado:any[] = [];
  listadoLineaProducto:any[] = [];
  listadoBolsa:any[] = [];
  listadoCamiones:any[] = [];
  listadoTipoMoneda:any[] = [];
  listadoyesno:any[] = [
    {nombre:'sí'},
    {nombre:'no'},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private grupoClienteService:GrupoClienteService,
    private centroRiesgoService:CentroRiesgoService,
    private nivelMoraService:NivelMoraService,
    private tipoDocumentoValoradoService:TipoDocumentoValoradoService,
    private lineaProductoService:LineaProductoService,
    private tipoMonedaService:TipoMonedaService
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
    this.listarGrupoCliente();
    this.listarLineaProducto();
    this.listarTipoDocumentoValorado();
    this.listarNivelMora();
    this.listarCentroRiesgo();
    this.listarClientes();
    this.listarTipoMoneda()
  }

  async listarGrupoCliente() {
    this.grupoClienteService.listar().then(data => {
      this.listadoGrupoCliente = data.payload;
      console.log(JSON.stringify(this.listadoGrupoCliente));
    })
  }

  async listarClientes() {
    this.grupoClienteService.listar().then(data => {
      this.listadoClientes = data.payload;
      console.log(JSON.stringify(this.listadoClientes));
    })
  }

  async listarCentroRiesgo() {
    this.centroRiesgoService.listar().then(data => {
      this.listadoCentroRiesgo = data.payload;
      console.log(JSON.stringify(this.listadoCentroRiesgo));
    })
  }

  async listarNivelMora() {
    this.nivelMoraService.listar().then(data => {
      this.listadoNivelMora = data.payload;
      console.log(JSON.stringify(this.listadoNivelMora));
    })
  }

  async listarTipoDocumentoValorado() {
    this.tipoDocumentoValoradoService.listarDocumentosValorados().then(data => {
      this.listadoTipoDocumentoValorado = data.payload;
      console.log(JSON.stringify(this.listadoTipoDocumentoValorado));
    })
  }

  async listarLineaProducto() {
    this.lineaProductoService.listar().then(data => {
      this.listadoLineaProducto = data.payload;
      console.log(JSON.stringify(this.listadoLineaProducto));
    })
  }

  async listarTipoMoneda() {
    this.tipoMonedaService.listar().then(data => {
      this.listadoTipoMoneda = data.payload;
      console.log(JSON.stringify(this.listadoTipoMoneda));
    })
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
