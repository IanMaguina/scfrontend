import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ConsorciosCoincidentesDialogComponent } from './consorcios-coincidentes-dialog/consorcios-coincidentes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { GruposCoincidentesDialogComponent } from './grupos-coincidentes-dialog/grupos-coincidentes-dialog.component';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';
import { GlobalSettings } from 'src/app/shared/settings';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
@Component({
  selector: 'app-datos-cliente-sc',
  templateUrl: './datos-cliente-sc.component.html',
  styles: [
  ]
})
export class DatosClienteScComponent implements OnInit {
  @Output() onFirstFormGroup: EventEmitter<any> = new EventEmitter();
  @Output() id_solicitud_hija: EventEmitter<any> = new EventEmitter();
  @Input() id_solicitud_editar: number;
  firstFormGroup: FormGroup;
  /* to settings constantes */
  radioGrupo: number = 1;
  radioConsorcio: number = 2;
  radioEmpresa: number = 3;
  /* end */
  cliente: number = 1;
  ClientSelectorControl = new FormControl('auto');
  panelOpenState = false;

  /* toolTip control */
  positionOption: TooltipPosition = 'above';
  //stepperOrientation: Observable<StepperOrientation>;

  nombreGrupoAcordeon: string = null;
  clienteData: ClienteDatos;
  cliente_seleccionado: number = null;
  id_solicitud_dc: number = 0;
  ID_TIPO_CLIENTE: number;

  ROL_SOLICITANTE = GlobalSettings.ROL_SOLICITANTE;

  userInfo: any;
  solicitud: Solicitud;
  ESTADO_SOLICITUD: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  public estadoSolicitud: boolean = false;
  usuario_sociedad_codigo_sap:string="";

  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    private _snack: MatSnackBar,
    private solicitudService: SolicitudService,
    private autenticacionService: AutenticacionService,
    /* breakpointObserver: BreakpointObserver */
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    console.log("user info : " + JSON.stringify(this.userInfo));
    console.log("editar solicitud datos cliente--->" + this.id_solicitud_editar);
    this.firstFormGroup = this._formBuilder.group({
      tipo_cliente: [this.cliente, this.ClientSelectorControl, Validators.required],
      nombreGrupo: [''],
      rucGrupo: [''],
      clienteCodigoSapEmpresa: [''],
      rucEmpresa: [''],
      clienteCodigoSapConsorcio: [''],
      rucConsorcio: [''],
    });
  }

  async ngOnInit(){
    this.usuario_sociedad_codigo_sap=this.userInfo.sociedad_codigo_sap;
    console.log("sociedad del solicitante--->" + this.usuario_sociedad_codigo_sap);
    
    if (this.id_solicitud_editar !== null) {
      await this.obtenerSolicitud();
    }
  }



  async listarGrupoEmpresarialxSolicitud(filtro: any) {
    this.solicitudService.listarGrupoEmpresarialxSolicitud(filtro).then(res => {
      console.log("listarGrupoEmpresarialxSolicitud--->" + JSON.stringify(res.payload));
      this.clienteData = res.payload;
    })

  }
  async listarConsorcioxSolicitud(filtro: any) {
    this.solicitudService.listarConsorcioxSolicitud(filtro).then(res => {
      console.log("listarConsorcioxSolicitud--->" + JSON.stringify(res.payload));
      this.clienteData = res.payload;
    })
  }

  async listarEmpresaIndividualxSolicitud(filtro: any) {
    this.solicitudService.listarEmpresaIndividualxSolicitud(filtro).then(res => {
      console.log("listarEmpresaIndividualxSolicitud--->" + JSON.stringify(res.payload));
      this.clienteData = res.payload;
    })
  }
  async obtenerSolicitud() {
    this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then((data) => {
      console.log("datos cliente--->" + JSON.stringify(data));
      this.solicitud = data.payload;
      this.ESTADO_SOLICITUD = this.solicitud.id_estado;
      this.cliente_seleccionado = data.payload.id_tipo_cliente;
      switch (data.payload.id_tipo_cliente) {
        case 1:
          this.ClientSelectorControl.setValue(this.radioGrupo)
          this.cliente_seleccionado = this.radioGrupo;
          this.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud_editar });
          break;
        case 2:
          this.ClientSelectorControl.setValue(this.radioConsorcio)
          this.cliente_seleccionado = this.radioConsorcio;
          this.listarConsorcioxSolicitud({ id_solicitud: this.id_solicitud_editar });
          break;
        case 3:
          this.ClientSelectorControl.setValue(this.radioEmpresa)
          this.cliente_seleccionado = this.radioEmpresa;
          console.log("xxxxxxxxxx---->"+this.cliente_seleccionado);
          this.listarEmpresaIndividualxSolicitud({ id_solicitud: this.id_solicitud_editar });
          break;
      }
      console.log("datos cliente2--->" + JSON.stringify(data));
    })
  }

  seleccionCliente() {
    //this.cliente_seleccionado = this.ClientSelectorControl.value;
    //this.cliente_pre_seleccionado = this.firstFormGroup.get("ClientSelectorControl").value;
    //console.log("RADIO BOTTON-->" + this.cliente_pre_seleccionado)
  }

  async openBuscarCoincidentes(data: any) {
    data.tipo_cliente = this.ClientSelectorControl.value;
    data.usuario_sociedad_codigo_sap=this.usuario_sociedad_codigo_sap;

    console.log('openBuscarCoincidentes--->' + JSON.stringify(data));
    
    //data.tipo_cliente = this.cliente_pre_seleccionado;
    switch (data.tipo_cliente) {
      case 1:
        console.log("Grupo Empresarial");
        if ((data.nombreGrupo === "" && data.rucGrupo === "")) {
          console.log("esta vacio");
          break;
        }

        const dialogRef1 = this.matDialog.open(GruposCoincidentesDialogComponent, {
          disableClose: true,
          data: data
        });
        dialogRef1.afterClosed().subscribe(async result => {
          console.log("return Grupo dialogs-->" + JSON.stringify(result));
          if (result.resultado === 'CONFIRM_DLG_YES') {
            this.cliente_seleccionado = data.tipo_cliente;
            if (this.id_solicitud_editar === null) {
              this.crearSolicitud(result.grupo).then(async (id) => {
                this.id_solicitud_editar = id;
                this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', id]);
                //this.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud_editar });
              });
            } else {
              this.actualizarSolicitud(result.grupo).then(async (id) => {
                this.id_solicitud_editar = id;
                this.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud_editar });
              });
            }
          }
        });
        break;
      case 2:
        this.cliente_seleccionado = data.tipo_cliente;
        console.log("CONSORCIO");
        if (data.clienteCodigoSapConsorcio === "" && data.rucConsorcio === "") {
          break;
        }
        let filtroConsorcio = {}
        if (data.rucConsorcio) {
          console.log("entrooooooo")
          filtroConsorcio = {
            numero_documento: data.rucConsorcio,
            sociedad_codigo_sap: this.usuario_sociedad_codigo_sap
          }
          this.listarConsorcioxFiltros(filtroConsorcio);
        }
        else {
          filtroConsorcio = {
            cliente_codigo_sap: data.clienteCodigoSapConsorcio,
            sociedad_codigo_sap: this.usuario_sociedad_codigo_sap
          }
          this.listarConsorcioxFiltros(filtroConsorcio);
        }

        break;
      case 3:
        if ((data.clienteCodigoSapEmpresa === "" && data.rucEmpresa === "")) {
          console.log("esta vacio");
          break;
        }

        let filtro = {}
        if (data.rucEmpresa){
          filtro={
            numero_documento: data.rucEmpresa,
            sociedad_codigo_sap: this.usuario_sociedad_codigo_sap,
            origen:'S'
          }
        }else{
          filtro={
            cliente_codigo_sap: data.clienteCodigoSapEmpresa,
            sociedad_codigo_sap: this.usuario_sociedad_codigo_sap,
            origen:'S'
          }
        }
        this.solicitudService.listarEmpresaIndividualxFiltros(filtro).then((result) => {
          console.log("empresa Individual-->"+JSON.stringify(result));
          this.cliente_seleccionado = data.tipo_cliente;
          if (result.payload && result.payload.warning) {
            this.openAlerta(result.payload.warning.mensaje);            
          } else {
            if (result.payload){
            if (this.id_solicitud_editar === null) {
              console.log("validar empresa sociedad: " + JSON.stringify(result.payload));

              this.crearSolicitud(result.payload).then(async (id) => {
                this.id_solicitud_editar = id;
                this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', id]);
              });
            } else {
              console.log("return Individual dialogs-->" + JSON.stringify(result));
              this.actualizarSolicitud(result.payload).then(async (id) => {
                this.id_solicitud_editar = id;
                this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', id]);
              });
            }
          }else{
            this.openAlerta("Recurso no valido");            
          }

          }
        })

        break;
    }
  }

  limpiarCampo(nombre: string) {
    this.firstFormGroup.get(nombre).setValue('');
  }

  async listarConsorcioxFiltros(filtro: any) {
    this.solicitudService.listarConsorcioxFiltros(filtro).then((result) => {
      if (!result.payload.warning) {
        if (this.id_solicitud_editar === null) {
          this.crearSolicitud(result.payload).then(async (id) => {
            this.id_solicitud_editar = id;
            this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', id]);
            console.log("lohizotodobien-->")
            //this.listarConsorcioxSolicitud({ id_solicitud: this.id_solicitud_editar });
          });
        } else {
          this.actualizarSolicitud(result.payload).then(async (id) => {
            this.id_solicitud_editar = id;
            this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', id]);
          });
        }
      } else {
        this.openAlerta(result.payload.warning.mensaje);
      }


    })
  }

  async crearSolicitud(cliente: any): Promise<any> {
    console.log("para crear solicitud-->" + JSON.stringify(cliente));
    let id_solicitud = null;
    let solicitud: Solicitud = this.mapeoSolicitud(cliente);

    return new Promise(
      (resolve, reject) => {
        this.solicitudService.crear(solicitud).then(async data => {
          console.log(" hector " + JSON.stringify(data));
          if (data.payload) {
            if (data.payload.id) {
              this.enviarMensajeSnack(`se creó el borrador: ${data.payload.id}`);
              id_solicitud = data.payload.id;
              this.id_solicitud_hija.emit(id_solicitud);
              this.estadoSolicitud = true;
              resolve(id_solicitud)
            } else {
              this.estadoSolicitud = false;
              this.openAlerta(data.payload.warning.mensaje);
            }
          }
        }).catch(
          (error) => {
            this.estadoSolicitud = false;
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      })
  }

  mapeoSolicitud(cliente: any) {
    let solicitud: Solicitud = {
      correlativo: null,
      id_estado: this.ESTADO_SOLICITUD_EN_SOLICITANTE,
      id_rol: this.ROL_SOLICITANTE,
      id_usuario: this.userInfo.id,
      id_usuario_creacion: this.userInfo.id,
      id_solicitud_referencia: null,
      sociedad_codigo_sap: this.userInfo.sociedad_codigo_sap,
      id_cliente_agrupacion: (this.cliente_seleccionado !== 3 ? cliente.id : null),
      id_empresa: (this.cliente_seleccionado === 3 ? cliente.id : null),
      id_tipo_cliente: this.cliente_seleccionado,
      crear_correlativo: false
    }
    return solicitud;
  }

  async actualizarSolicitud(grupo: any): Promise<any> {
    let id_solicitud = null;
    let solicitud: Solicitud = this.mapeoEditarSolicitud(grupo);
    console.log("mapeo-->" + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.solicitudService.actualizarSolicitud(this.id_solicitud_editar, solicitud).then(async data => {
          console.log("se actualizo la solicitud-->" + JSON.stringify(data));
          if (data.payload) {
            if (data.payload.warning) {
              this.openAlerta(data.payload.warning.mensaje);              
            } else {
              this.enviarMensajeSnack("se actualizo la solicitud");
              id_solicitud = this.id_solicitud_editar;
              this.id_solicitud_hija.emit(this.id_solicitud_editar);
              resolve(id_solicitud);


            }
          }
        }).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      })
  }

  mapeoEditarSolicitud(cliente: any) {
    let solicitud: Solicitud = {
      id: this.id_solicitud_editar,
      id_estado: this.ESTADO_SOLICITUD_EN_SOLICITANTE,
      id_rol: this.ROL_SOLICITANTE,
      id_usuario: this.userInfo.id,
      id_usuario_creacion: this.userInfo.id,
      sociedad_codigo_sap: this.userInfo.sociedad_codigo_sap,
      id_cliente_agrupacion: (this.cliente_seleccionado !== 3 ? cliente.id : null),
      id_empresa: (this.cliente_seleccionado === 3 ? cliente.id : null),
      id_tipo_cliente: this.cliente_seleccionado,
      crear_correlativo: false
    }
    return solicitud;
  }

  openAlerta(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: mensaje
    });

  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
}
