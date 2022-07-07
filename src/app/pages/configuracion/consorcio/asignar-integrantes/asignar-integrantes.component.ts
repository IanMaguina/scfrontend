import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { ConsorcioService } from '@services/consorcio.service';
import { SolicitudAdjuntoService } from '@services/solicitud-adjunto.service';
import { Adjunto } from 'src/app/models/adjunto.interface';
import { AgrupacionClienteSolicitud } from 'src/app/models/agrupacion-cliente-solicitud.interface';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { ClienteEmpresa } from 'src/app/models/cliente-empresa.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ClienteEmpresaService } from 'src/app/services/cliente-empresa.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';

const ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_EXISTENTE = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_EXISTENTE;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_DESACTIVAR = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_DESACTIVAR;
const PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;
const PERFIL_USUARIO: number = GlobalSettings.PERFIL_USUARIO;

@Component({
  selector: 'app-asignar-integrantes',
  templateUrl: './asignar-integrantes.component.html',
  styles: [
  ]
})
export class AsignarIntegrantesComponent implements OnInit {
  consorcioData: any;
  asignarEmpresaFormDialog: any;
  formErrors = {
/*     'sociedad': '', */
    'ruc': '',
    'razon_social': '',
    'participacion': '',
  }
  validationMessages = {
/*     'sociedad': {
      'required': 'Sociedad es requerida.'
    }, */
    'ruc': {
      'required': 'el Número de documento es requerido.',
    },
    'razon_social': {
      'required': 'consorciado es requerido.',
    },
    'participacion': {
      'required': 'la participación es requerida.',
    }
  };
  /* Participacion */

  listadoAdjuntosParticipacion: Adjunto[];
  formParticipacion!: FormGroup;
  private file_store: FileList;
  private file_list: Array<string> = [];
  formErrorsP = {
    'description': '',
    'file': '',
  }
  validationMessagesP = {
    'description': {
      'required': ' informacion_adicional es requerido.'
    },
    'file': {
      'required': ' adjunto es requerido.',
    }
  };



  //Submitted form
  submitted = false;
  carga: boolean = false;
  //Submitted form participacion
  submitted2 = false;
  carga2: boolean = false;

  //poner el tipado correcto => es data dummy
  listadoSociedades: Sociedad[] = [];


  listadoIntegrantes: AgrupacionClienteSolicitud[] = [];

  displayedColumns: string[] = [
/*     'sociedad',
    'grupo_cliente', */
    'razonsocial',
    'ruc',
/*     'canal', */
    'participacion',
    'estado_cliente_agrupacion',
    'id',
  ];

  displayedColumnsF:string[]=[
    'informacion_adicional',
    'adjunto',
  ];


  userInfo: any;
  id_cliente_agrupacion: number = null;
  id_usuario: number;
  isAdmin: boolean = false;
  PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;
  id_estado_cliente_agrupacion: number = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO;
  constructor(
    public dialogRef: MatDialogRef<AsignarIntegrantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private sociedadService: SociedadService,
    private autenticacionService: AutenticacionService,
    private empresaService: EmpresaService,
    private clienteEmpresaService: ClienteEmpresaService,
    private consorcioService: ConsorcioService,
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private readonly solicitudAdjuntoService: SolicitudAdjuntoService,
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario = this.userInfo.id;
    this.id_estado_cliente_agrupacion = data.id_estado_cliente_agrupacion;
    if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR && this.id_estado_cliente_agrupacion !== ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    this.consorcioData = data;
    console.log("trayendo del listado--->" + JSON.stringify(this.consorcioData));
    this.id_cliente_agrupacion = this.consorcioData.id;

    /*  */
    this.asignarEmpresaFormDialog = this.formBuilder.group({
/*       sociedad: ['', Validators.required], */
      ruc: ['', Validators.required],
      razon_social: [''],
      participacion: ['', Validators.required],
    })
    this.asignarEmpresaFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.asignarEmpresaFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
    /*  */
    this.formParticipacion  = this.formBuilder.group({
      description: ['', Validators.required],
      file: ['', Validators.required],
    })
    this.formParticipacion.valueChanges.subscribe(() => {
      this.formErrorsP = this.formValidatorService.handleFormChanges(this.formParticipacion, this.formErrorsP, this.validationMessagesP, this.submitted2);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listarSociedades();
    this.listarClienteEmpresa();
    this.listarAdjuntos();
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      console.log("listarSociedad:" + JSON.stringify(data));
      this.listadoSociedades = data;
    })
  }

  async listarClienteEmpresa() {
    await this.clienteEmpresaService.listarClienteAgrupacionEmpresa(this.id_cliente_agrupacion).then(data => {
      console.log("listarClienteEmpresas:" + JSON.stringify(data));
      this.listadoIntegrantes = data.payload;
    })

  }

  asignarEmpresaConsorcio(form: any) {
    let clienteEmpresa: any = {
      id_cliente_agrupacion: this.id_cliente_agrupacion,
      numero_documento: form.ruc,
      razon_social:form.razon_social,
      id_usuario: this.id_usuario,
      participacion: form.participacion,
    }
    console.log("asignarEmpresaGrupo-->" + JSON.stringify(clienteEmpresa));
    this.clienteEmpresaService.crearClienteEmpresa(clienteEmpresa).then((result) => {
      if (result.header.exito) {
        if (result.payload.warning) {
          this.enviarMensajeSnack(result.payload.warning.mensaje);
        } else {
          this.enviarMensajeSnack('Se agregó la empresa');
          this.limpiarCampos();
          this.listarClienteEmpresa();
        }
      }
    });
  }

  eliminarClienteEmpresa(element: any) {
    element.mensaje = `¿Desea desasignar la empresa: ${element.empresa.razon_social} de este consorcio? `;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        console.log("form al eliminar empresa: " + JSON.stringify(element));
        let clienteEmpresa: ClienteEmpresa = {
          id: element.id,
          id_cliente_agrupacion: element.id_cliente_agrupacion,
          id_empresa: element.id_empresa,
          id_usuario: this.id_usuario,
        }
        this.clienteEmpresaService.eliminarClienteEmpresa(clienteEmpresa, this.id_usuario).then(data => {
          console.log("ARSA warning-->" + JSON.stringify(data));
          if (data.header.exito) {
            this.enviarMensajeSnack('Se retiró la empresa');
            this.listarClienteEmpresa();
          }
        });
      } else {
        this.listarClienteEmpresa();
      }
    });
  }

  AprobarConsorcio() {
    let item: ClienteAgrupacion = {
      id_usuario: this.id_usuario,
      id: this.id_cliente_agrupacion
    }
    this.consorcioService.aprobarConsorcio(item).then(data => {
      this.enviarMensajeSnack('Se aprobaron los cambios solicitados en el consorcio');
      this.onNoClick('CONFIRM_DLG_YES');
    })
  }

  RechazarConsorcio() {
    let item: ClienteAgrupacion = {
      id_usuario: this.id_usuario,
      id: this.id_cliente_agrupacion
    }
    this.consorcioService.rechazarConsorcio(item).then(data => {
      this.enviarMensajeSnack('Se rechazaron los cambios solicitados en el consorcio');
      this.onNoClick('CONFIRM_DLG_YES');
    })
  }

  async callWarningDialog(mensaje: string) {

    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje,
      panelClass: 'custom_Config'
    });

  }

  onNoClick(msg: string): void {
    this.dialogRef.close(msg);
  }


  

  limpiarCampos() {
    this.asignarEmpresaFormDialog.reset();
  }
  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  mostrarEliminar(element) {
    let accionEliminar: boolean = false;
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = true;
      else
        accionEliminar = true;
    }
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = false;
      else
        accionEliminar = true;

    }
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_DESACTIVAR) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = false;
      else
        accionEliminar = true;

    }
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_EXISTENTE) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = false;
      else
        accionEliminar = true;
    }
    return accionEliminar;
  }

  mostrarIconoEliminar(element) {
    let accionEliminar: string = 'delete';
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = 'delete';
      else
        accionEliminar = 'delete';
    }
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = '';
      else
        accionEliminar = 'delete';

    }
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_DESACTIVAR) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = '';
      else
        accionEliminar = 'rotate_left';

    }
    if (element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_EXISTENTE) {
      if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR)
        accionEliminar = '';
      else
        accionEliminar = 'rotate_left';
    }
    return accionEliminar;
  }

  public onSaveForm(): void {

    const formData = new FormData();
    const { description } = this.formParticipacion.value;
    this.file_list = [];

    
    formData.append("tabla", 'tcliente_agrupacion');
    formData.append("activo", `${true}`);
    formData.append("id_tipo_adjunto", `${4}`);
    formData.append("id_tabla", `${this.id_cliente_agrupacion}`);
    formData.append("informacion_adicional", description);

    for (let i = 0; i < this.file_store.length; i++) {
      formData.append("file", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    this.solicitudAdjuntoService.onAddAttached(formData)
    .subscribe(data => {
      if(data.header.exito){
        this.enviarMensajeSnack(`Se guardo el archivo: ${data.payload.informacion_adicional} `);
        
        this.listarAdjuntos();
      }
   
    });

  }

  public onInputFileChange(fileList: FileList): void {
    this.file_store = fileList;

    if (fileList.length) {
      const { name } = fileList[0];
      this.formParticipacion.controls['file'].patchValue(`${name}`);
      return;
    }

    this.formParticipacion.controls['file'].patchValue("");

  }
  listarAdjuntos(){
    if(this.id_cliente_agrupacion){
      this.solicitudAdjuntoService.listarAdjuntosParticipacion(this.id_cliente_agrupacion).then(data =>{
        console.log("adjuntos: "+JSON.stringify(data));
        if(data.header.exito){
          this.listadoAdjuntosParticipacion = data.payload;
        }
      })
    }
  }
  openURL(url:string){
    window.open(url);
  }

}

