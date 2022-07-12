import { TipoDocumentoValorado } from 'src/app/models/tipo-documento-valorado.interface';
import { RangoService } from './../../../../services/rango.service';
import { TipoFlujoAprobacion } from './../../../../models/tipo-flujo-aprobacion.interface';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Plan } from 'src/app/models/plan.interface';
import { CentroRiesgoService } from 'src/app/services/centro-riesgo.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';
import { LineaProductoService } from 'src/app/services/linea-producto.service';
import { NivelMoraService } from 'src/app/services/nivel-mora.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service';
import { PlanService } from 'src/app/services/plan.service';
import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { NivelMora } from 'src/app/models/nivel-mora.interface';
import { CentroRiesgo } from 'src/app/models/centro-riesgo.interface';
import { LineaProducto } from 'src/app/models/linea-producto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentoValoradoService } from '@services/documento-valorado.service';
@Component({
  selector: 'app-informacion-plan',
  templateUrl: './informacion-plan.component.html',
  styles: [
  ]
})
export class InformacionPlanComponent implements OnInit {
  @Input() plan: Plan;
  nombreplan: string = 'plan de prueba';
  informacionForm: any;

  formErrors = {
    'checkGrupos': '',
    'checkClientes': '',
    'checkTodos': '',
    'grupoCliente': '',
    'cartaFianza': '',
    'nivelMora': '',
    'centroRiesgo': '',
    'tipoDocumentoValorado': '',
    'rango': '',
    'lineaProducto': '',
    'moneda': '',
    'bolsa': '',
    'camiones': '',
    'revisionMensual': '',
  }
  validationMessages = {
    'checkGrupos': {
      'required': 'el checkGrupos es requerido.'
    },
    'checkClientes': {
      'required': 'el checkClientes es requerido.'
    },
    'checkTodos': {
      'required': 'el checkTodos es requerido.'
    },
    'grupoCliente': {
      'required': 'el grupocliente es requerido.'
    },
    'cartaFianza': {
      'required': 'el cartaFianza es requerido.'
    },
    'nivelMora': {
      'required': 'el nivelMora es requerido.'
    },
    'centroRiesgo': {
      'required': 'el centroRiesgo es requerido.'
    },
    'tipoDocumentoValorado': {
      'required': 'el tipoDocumentoValorado es requerido.'
    },
    'lineaProducto': {
      'required': 'el lineaProducto es requerido.'
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
    'revisionMensual': {
      'required': 'el revisionMensual es requerido.'
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  /* validar tipo seleccion grupo o cliente */
  checkClientes: boolean = false;
  checkGrupos: boolean = false;
  checkTodos: boolean = false;

  /* listados */
  listadoInformacionPlan: any = {};
  listadoGrupoCliente: any[] = [];
  mostrarGrupoCliente: any[] = [];
  listadoClientes: any[] = [];
  mostrarClientes: any[] = [];
  listadoNivelMora: any[] = [];
  mostrarNivelMora: any[] = [];
  listadoCentroRiesgo: any[] = [];
  mostrarCentroRiesgo: any[] = [];
  listadoTipoDocumentoValorado: any[] = [];
  mostrarTipoDocumentoValorado: any[] = [];
  listadoRango: any[] = [];
  mostrarRango: any[] = [];
  listadoLineaProducto: any[] = [];
  mostrarLineaProducto: any[] = [];
  listadoBolsa: any[] = [];
  listadoCamiones: any[] = [];
  listadoTipoMoneda: any[] = [];
  mostrarTipoMoneda: any = {};
  listadoyesno: any[] = [
    { id:'S',nombre: 'Si' },
    { id:'N',nombre: 'No' },
  ]

  tipoFlujoAprobacion: TipoFlujoAprobacion;
  grupoClienteService: GrupoClienteService;
  tipoMonedaService: TipoMonedaService;
  rangoService: RangoService;
  planService: PlanService;
  lineaProductoService: LineaProductoService;
  constructor(
    private injector: Injector,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private centroRiesgoService: CentroRiesgoService,
    private nivelMoraService: NivelMoraService,
    private documentoValoradoService: DocumentoValoradoService,
    private _snack: MatSnackBar
  ) {
    this.grupoClienteService = injector.get<GrupoClienteService>(GrupoClienteService);
    this.tipoMonedaService = injector.get<TipoMonedaService>(TipoMonedaService);
    this.rangoService = injector.get<RangoService>(RangoService);
    this.planService = injector.get<PlanService>(PlanService);
    this.lineaProductoService = injector.get<LineaProductoService>(LineaProductoService);

    this.informacionForm = this.formBuilder.group({
      checkGrupos: [''],
      checkClientes: [''],
      checkTodos: [''],
      grupoCliente: [''],
      cliente: [''],
      cartaFianza: ['', Validators.required],
      nivelMora: ['', Validators.required],
      centroRiesgo: ['', Validators.required],
      tipoDocumentoValorado: [''],
      rango: [''],
      lineaProducto: ['', Validators.required],
      moneda: ['', Validators.required],
      bolsa: ['', Validators.required],
      camiones: ['', Validators.required],
      revisionMensual: ['', Validators.required],
    })
    this.informacionForm.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.informacionForm, this.formErrors, this.validationMessages, this.submitted);
    })

  }

  async ngOnInit(){
    console.log("ngOnInit");
    console.log("Data del plan en información-->" + JSON.stringify(this.plan));
    this.tipoFlujoAprobacion = { id: this.plan.tipo_plan_credito.id_tipo_flujo_aprobacion, nombre: "" };
    await this.listarGrupoCliente();
    await this.listarLineaProducto();
    await this.listarDocumentoValorado();
    await this.listarNivelMora();
    await this.listarCentroRiesgo();
    await this.listarClientes();
    await this.listarTipoMoneda()
    await this.listarInformacionPlan();
  }

  async listarInformacionPlan() {
    this.planService.editarInformacion(this.plan.id).then(data => {
      console.log("listado informacion de plan-->" + JSON.stringify(data.payload));
      this.listadoInformacionPlan=data.payload;
      this.llenarCamposTexto();
      this.marcarGrupoCiente();
      this.llenarGrupoCliente();
      this.marcarClientes();
      this.llenarClientes();
      this.marcarNivelMora();
      this.llenarNivelMora();
      this.marcarCentroRiesgo();
      this.llenarCentroRiesgo();
      this.marcarDocumentoValorado();
      this.llenarDocumentoValorado();
      this.marcarLineaProducto();
      this.llenarLineaProducto();
      this.marcarTipoMoneda();
      this.llenarTipoMoneda();
    })
  }

  async listarGrupoCliente() {
    this.grupoClienteService.listarGrupoCliente().then(data => {
      this.listadoGrupoCliente = data.payload;
      console.log("listarGrupoCliente-->"+JSON.stringify(this.listadoGrupoCliente));
    })
  }

  async listarClientes() {
    this.grupoClienteService.listarClientes().then(data => {
      this.listadoClientes = data.payload;
      console.log("listarClientes--->"+JSON.stringify(this.listadoClientes));
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
      console.log("nivel mora despues-->"+JSON.stringify(this.listadoNivelMora));
    })
  }

  async listarDocumentoValorado() {
    this.documentoValoradoService.listarDocumentosValorados().then(data => {
      this.listadoTipoDocumentoValorado = data.payload;
      console.log("Tipo DV--->"+JSON.stringify(this.listadoTipoDocumentoValorado));
    })
  }

  async listarRango() {
    this.rangoService.listar().then(data => {
      this.listadoRango = data.payload;
      console.log(JSON.stringify(this.listadoRango));
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
      console.log("tipo_moneda--->"+JSON.stringify(this.listadoTipoMoneda));
    })
  }

  activarConfiguracion() {
    console.log(JSON.stringify(this.informacionForm['radioConfig']));
  }

  llenarCamposTexto(){
    this.informacionForm.get("cartaFianza")?.setValue(this.listadoInformacionPlan.carta_fianza);
    this.informacionForm.get("bolsa")?.setValue(this.listadoInformacionPlan.bolsa);
    this.informacionForm.get("camiones")?.setValue(this.listadoInformacionPlan.camiones);
    this.informacionForm.get("revisionMensual")?.setValue(this.listadoInformacionPlan.revision_mensual);
  }  

  marcarGrupoCiente() {
    this.informacionForm.get("checkGrupos")?.setValue(false);
    let campo:any[] = this.listadoInformacionPlan.grupo_cliente
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({codigo_sap:item.grupo_cliente.codigo_sap, nombre: item.grupo_cliente.nombre})
    })
    if (devuelve.length>0){
      this.informacionForm.get("checkGrupos")?.setValue(true);
    }
    this.informacionForm.get("grupoCliente")?.setValue(devuelve);
  }  

  llenarGrupoCliente() {
    let grupoCliente = this.informacionForm.get("grupoCliente").value;
    console.log(JSON.stringify(grupoCliente) + "---al cambiar el grupoCliente ");
    this.mostrarGrupoCliente = grupoCliente;
  }

  marcarClientes() {
    this.informacionForm.get("checkClientes")?.setValue(false);
    let campo:any[] = this.listadoInformacionPlan.lista_cliente;
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({codigo_sap:item.grupo_cliente.codigo_sap, nombre: item.grupo_cliente.nombre})
    })
    if (devuelve.length>0){
      this.informacionForm.get("checkClientes")?.setValue(true);
    }    
    this.informacionForm.get("cliente")?.setValue(devuelve);
  }  

  llenarClientes() {
    let clientes = this.informacionForm.get("cliente").value;
    console.log(JSON.stringify(clientes));
    this.mostrarClientes = clientes;
  }

  marcarNivelMora() {
    let campo:any[] = this.listadoInformacionPlan.nivel_mora
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({id:item.nivel_mora.id, nombre: item.nivel_mora.nombre})
    })
    this.informacionForm.get("nivelMora")?.setValue(devuelve);
  }  

  llenarNivelMora() {
    let nivelMora = this.informacionForm.get("nivelMora").value;
    console.log(JSON.stringify(nivelMora));
    this.mostrarNivelMora = nivelMora;
  }

  marcarCentroRiesgo() {
    let campo:any[] = this.listadoInformacionPlan.centro_riesgo;
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({id:item.centro_riesgo.id, nombre: item.centro_riesgo.nombre})
    })
    this.informacionForm.get("centroRiesgo")?.setValue(devuelve);
  }  

  llenarCentroRiesgo() {
    let centroRiesgo = this.informacionForm.get("centroRiesgo").value;
    console.log(JSON.stringify(centroRiesgo));
    this.mostrarCentroRiesgo = centroRiesgo;
  }

  marcarDocumentoValorado() {
    let campo:any[] =this.listadoInformacionPlan.documento_valorado;
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({id:item.documento_valorado.id, nombre:item.documento_valorado.nombre})
    })
    this.informacionForm.get("tipoDocumentoValorado")?.setValue(devuelve);
  }  

  llenarDocumentoValorado() {
    let tipoDocumentoValorado = this.informacionForm.get("tipoDocumentoValorado").value;
    console.log("ARSA-->"+JSON.stringify(tipoDocumentoValorado));
    this.mostrarTipoDocumentoValorado = tipoDocumentoValorado;
  }

  marcarRango() {
    let campo:any[] = this.listadoInformacionPlan.documento_valorado;
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({id:item.id_documento_valorado})
    })
    this.informacionForm.get("tipoDocumentoValorado")?.setValue(devuelve);
  }  

  llenarRango() {
    let rango = this.informacionForm.get("rango").value;
    console.log(JSON.stringify(rango));
    this.mostrarRango = rango;
  }

  marcarLineaProducto() {
    let campo:any[] = this.listadoInformacionPlan.linea_producto;
    let devuelve:any[]=[];
    campo.forEach(item=>{
      devuelve.push({codigo_sap:item.linea_producto.codigo_sap,nombre:item.linea_producto.nombre})
    })
    this.informacionForm.get("lineaProducto")?.setValue(devuelve);
  }  

  llenarLineaProducto() {
    let lineaProducto = this.informacionForm.get("lineaProducto").value;
    console.log(JSON.stringify(lineaProducto));
    this.mostrarLineaProducto = lineaProducto;
  }

  marcarTipoMoneda() {
    let campo:any = this.listadoInformacionPlan.tipo_moneda;
    console.log("marcaTipoMoneda--->"+JSON.stringify(campo));
    this.informacionForm.get("moneda")?.setValue(campo.id);
  }  

  llenarTipoMoneda() {
    let moneda = this.informacionForm.get("moneda").value;
    console.log("llenarTipoMoneda--->"+JSON.stringify(moneda));
    this.mostrarTipoMoneda = moneda;
  }

  async guardarSeccionInformacion(form: any) {
    console.log("guardarSeccionInformacion--->" + JSON.stringify(form));
    let plan = await this.mapeoPlan(form)
    console.log("crear guardarSeccionInformacion:" + JSON.stringify(plan));
    this.planService.guardarInformacion(plan).then(() => {
      this._snack.open("Se guardo Información del Plan", 'cerrar', {
        duration: 3600,
        horizontalPosition: "end",
        verticalPosition: "top"
      });

    });
  }

  async mapeoPlan(form: any) {
    let plan: Plan = {
      id: this.plan.id,
      id_tipo_moneda: form.moneda,
      bolsa: form.bolsa,
      camiones: form.camiones,
      carta_fianza: form.cartaFianza,
      revision_mensual: form.revisionMensual,
      grupo_cliente: this.retornarGrupoCliente(),
      lista_cliente: this.retornarCliente(),
      nivel_mora: this.retornarNivelMora(),
      centro_riesgo: this.retornarCentroRiesgo(),
      documento_valorado: this.retornarTipoDocumentoValorado(),
      linea_producto: this.retornarLineaProducto()
    }
    return plan;
  }

  retornarGrupoCliente() {
    let grupoCliente: GrupoCliente[] = this.informacionForm.get("grupoCliente").value;
    let valor: any[] = [];
    grupoCliente.forEach(item => {
      valor.push(item.codigo_sap);
    })
    return valor;
  }

  retornarCliente() {
    let cliente: GrupoCliente[] = this.informacionForm.get("cliente").value;
    let valor: any[] = [];
    cliente.forEach(item => {
      valor.push(item.codigo_sap);
    })
    return valor;
  }

  retornarNivelMora() {
    let nivelMora: NivelMora[] = this.informacionForm.get("nivelMora").value;
    let valor: any[] = [];
    nivelMora.forEach(item => {
      valor.push(item.id);
    })
    return valor;
  }

  retornarCentroRiesgo() {
    let centroRiesgo: CentroRiesgo[] = this.informacionForm.get("centroRiesgo").value;
    let valor: any[] = [];
    centroRiesgo.forEach(item => {
      valor.push(item.id);
    })
    return valor;
  }

  retornarTipoDocumentoValorado() {
    let tipoDocumentoValorado: TipoDocumentoValorado[] = this.informacionForm.get("tipoDocumentoValorado").value;
    let valor: any[] = [];
    tipoDocumentoValorado.forEach(item => {
      valor.push(item.id);
    })
    return valor;
  }

  retornarLineaProducto() {
    let lineaProducto: LineaProducto[] = this.informacionForm.get("lineaProducto").value;
    let valor: any[] = [];
    lineaProducto.forEach(item => {
      valor.push(item.codigo_sap);
    })
    return valor;
  }

  compareGrupoCliente(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareClientes(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }


  compareNivelMora(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareCentroRiesgo(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareTipoDocumentoValorado(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }  

  compareRango(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareLineaProducto(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareCamiones(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

}

