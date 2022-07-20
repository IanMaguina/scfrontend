import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { TipoCliente } from 'src/app/models/tipo-cliente.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-bandeja-solicitud-credito',
  templateUrl: './bandeja-solicitud-credito.component.html',
  styles: [
  ]
})
export class BandejaSolicitudCreditoComponent implements OnInit {
  listadoSolicitudes: Solicitud[] = [];
  listadotipoCliente: TipoCliente[] = [
    {
      id:1, 
      nombre:'Grupo Empresarial'
    },
    {
      id:2, 
      nombre:'Consorcio'
    },
    {
      id:3, 
      nombre:'Empresa Individual'
    },
  ];

  listadoEstadosSolicitud: any[] = [];
  formulary: FormGroup;
  displayedColumns: string[] = [
    'estado',
    'correlativo',
    'numero_documento',
    'cliente',
    'fecha_creacion',
    'usuario'
  ];

  formErrors = {
    'tipo_cliente': '',
    'numero_documento': '',
    'estado': '',
    'solicitud': '',
    'fecha': '',
  }

  validationMessages = {
    'tipo_cliente': {
      'required': 'el tipo_cliente es requerido.'
    },
    'numero_documento': {
      'required': 'el ruc es requerido.'
    },
    'estado': {
      'required': 'el estado es requerido.'
    },
    'correlativo': {
      'required': 'el correlativo es requerido.'
    },
    'fecha': {
      'required': 'el fecha es requerido.'
    },

  };
  //Submitted form
  submitted = false;
  carga: boolean = false;
  userInfo: any;
  ESTADO_SOLICITUD:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION:number=GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;
  TIPO_CLIENTE_GRUPO_EMPRESARIAL:number = GlobalSettings.TIPO_CLIENTE_GRUPO_EMPRESARIAL;

  notGrupo:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService,
    private autenticacionService: AutenticacionService,
    private router: Router,

  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.formulary = this.formBuilder.group({
      tipo_cliente: ['',],
      numero_documento: [''],
      estado: [''],
      correlativo: [''],
      fecha: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit() {
    console.log("ngOnInit  bandeja de pendientes");
    this.listarSolicitud();
    this.listarEstadosSolicitud();
    this.validarTipoDocumento();
  }

  listarSolicitud() {
    let item = {
      id_usuario:this.userInfo.id
    }
    this.solicitudService.listarSolicitudesxFiltros(item).then(data => {
      //console.log("solicitudes:"+JSON.stringify(data));
      this.listadoSolicitudes = data.payload;
    })
  }

  listarEstadosSolicitud(){
    this.solicitudService.listarEstadosSolicitud().then(data => {
        this.listadoEstadosSolicitud = data.payload;
    });
  }

  editarSolicitud(element: any) {
    console.log("editarSolicitud--->"+JSON.stringify(element));
    if (element.id_estado===10){
      this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', element.id]);
    }
    if (element.id_estado===20){
      this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', element.id]);
      //this.router.navigate(['app/solicitudcredito/revisarSolicitudCredito', element.id]);
    }    
    if (element.id_estado===40){
      this.router.navigate(['app/solicitudcredito/evaluarSolicitudCredito', element.id]);
    }        
  }

  async buscarSolicitudes(form: any) {
    this.listadoSolicitudes = [];
    form.id_usuario=this.userInfo.id;
    await this.solicitudService.listarSolicitudesxFiltros(form).then( data => {
      console.log("solicitudes filtradas:"+JSON.stringify(data));
      this.listadoSolicitudes = data.payload;
     // this.limpiar();
    });
  }
  async validarTipoDocumento() {
    let tipo_cliente = this.formulary.get("tipo_cliente").value.id;
    if(tipo_cliente == this.TIPO_CLIENTE_GRUPO_EMPRESARIAL ){
      this.notGrupo = false;
    }else{
      this.notGrupo = true;
    }

  }

  limpiar(){
     this.formulary.get("tipo_cliente").setValue("");
     this.formulary.get("numero_documento").setValue("");
     this.formulary.get("estado").setValue("");
     this.formulary.get("correlativo").setValue("");
    this.formulary.get("fecha").setValue("");

  }

 
}
