import { EmpresaService } from './../../../../services/empresa.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { ClienteEmpresa } from 'src/app/models/cliente-empresa.interface';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ClienteAgrupacionEmpresa } from 'src/app/models/cliente-agrupacion-empresa.interface';
import { ClienteEmpresaService } from '@services/cliente-empresa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoEmpresarialService } from '@services/grupo-empresarial.service';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { GlobalSettings } from 'src/app/shared/settings';
import { AutenticacionService } from '@services/autenticacion.service';

const ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_EXISTENTE = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_EXISTENTE;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_DESACTIVAR = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_DESACTIVAR;
const PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;
const PERFIL_USUARIO: number = GlobalSettings.PERFIL_USUARIO;

@Component({
  selector: 'app-asignar-integrantes-grupo',
  templateUrl: './asignar-integrantes-grupo.component.html',
  styles: [
  ]
})
export class AsignarIntegrantesGrupoComponent implements OnInit {
  grupoData: any;
  asignarEmpresaFormDialog: any;

  formErrors = {
    'sociedad': '',
    'ruc': '',
  }

  validationMessages = {
    'sociedad': {
      'required': 'Nombre es requerido.'
    },
    'ruc': {
      'required': 'RUC es requerido.',
    }
  };

  //Submitted form
  submitted = false;
  carga: boolean = false;

  //poner el tipado correcto => es data dummy
  listadoSociedades: Sociedad[] = [];

  listadoIntegrantes: ClienteAgrupacionEmpresa[] = [];

  displayedColumns: string[] = [

    'codigocliente',
    'razonsocial',
    'ruc',
    'canal',
    'grupo_cliente',
    'estado_cliente_agrupacion',
    'id',
  ];
  userInfo: any;
  id_cliente_agrupacion: number = null;
  id_estado_cliente_agrupacion: number = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO;

  id_usuario: number;
  isAdmin: boolean = false;
  accionEliminar: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<AsignarIntegrantesGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private sociedadService: SociedadService,
    private empresaService: EmpresaService,
    private clienteEmpresaService: ClienteEmpresaService,
    private autenticacionService: AutenticacionService,
    private matDialog: MatDialog,
    private grupoEmpresarialService: GrupoEmpresarialService,
    private _snack: MatSnackBar,
  ) {
    this.grupoData = data;
    //console.log("ARSA-->" + JSON.stringify(data));
    this.id_cliente_agrupacion = data.id;
    this.id_estado_cliente_agrupacion = data.id_estado_cliente_agrupacion;
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario = this.userInfo.id;
    if (this.userInfo.id_perfil === PERFIL_ADMINISTRADOR && this.id_estado_cliente_agrupacion !== ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    this.asignarEmpresaFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      ruc: ['', Validators.required],
    })
    this.asignarEmpresaFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.asignarEmpresaFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })

  }

  ngOnInit(): void {
    this.listarClienteEmpresa();
    this.listarSociedades();
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      this.listadoSociedades = data;
    })
  }

  listarClienteEmpresa() {
    this.clienteEmpresaService.listarClienteAgrupacionEmpresa(this.id_cliente_agrupacion).then(data => {
      this.listadoIntegrantes = data.payload;
      console.log("listarClienteEmpresa--->" + JSON.stringify(this.listadoIntegrantes));
    })
  }


  asignarEmpresaGrupo(form: any) {
    this.empresaService.buscarEmpresa(form.sociedad.codigo_sap, form.ruc).then(data => {
      if (data.header.exito) {
        if (data.payload) {
          let clienteEmpresa: ClienteEmpresa = {
            id_cliente_agrupacion: this.id_cliente_agrupacion,
            id_empresa: data.payload.id,
            id_usuario_creacion: this.id_usuario,
            id_usuario: this.id_usuario,
          }
          this.clienteEmpresaService.crearClienteEmpresa(clienteEmpresa).then(result => {
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
        } else {
          let mensaje: string = "Empresa no registrada";
          const dialogRef2 = this.matDialog.open(ErrorDialogComponent, {
            disableClose: true,
            width: "400px",
            data: mensaje
          });
          /* en realidad no habria return, pero por si acaso, borrar si es necesario */
          dialogRef2.afterClosed().subscribe(result => {
            this.limpiarCampos();
            this.listarClienteEmpresa();
          });
        }
      } else {
        let mensaje: string = "Empresa no registrada";
        if (data.payload.tiene_cliente) {
          let gc = data.payload.cliente.cliente_agrupacion.nombre
          mensaje = "Empresa ya fue asignada al Grupo / Consorcio " + gc;
        }
        const dialogRef2 = this.matDialog.open(ErrorDialogComponent, {
          disableClose: true,
          width: "400px",
          data: mensaje
        });
        /* en realidad no habria return, pero por si acaso, borrar si es necesario */
        dialogRef2.afterClosed().subscribe(result => {
          this.limpiarCampos();
          this.listarClienteEmpresa();
        });
      }

    })

  }

  eliminarClienteEmpresa(element: any) {

    element.mensaje = `¿Desea desasignar la empresa: ${element.empresa.razon_social} de este grupo? `;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let clienteEmpresa: ClienteEmpresa = {
          id: element.id,
          id_cliente_agrupacion: element.id_cliente_agrupacion,
          id_usuario: this.id_usuario,
        }
        this.clienteEmpresaService.eliminarClienteEmpresa(clienteEmpresa, this.id_usuario).then(data => {
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

  AprobarGrupo() {
    let item: ClienteAgrupacion = {
      id_usuario: this.id_usuario,
      id: this.id_cliente_agrupacion
    }
    this.grupoEmpresarialService.aprobarGrupoEmpresarial(item).then(data => {
      this.enviarMensajeSnack('Se aprobaron los cambios solicitados en el grupo');
      this.onNoClick('CONFIRM_DLG_YES');
    })
  }

  RechazarGrupo() {
    let item: ClienteAgrupacion = {
      id_usuario: this.id_usuario,
      id: this.id_cliente_agrupacion
    }
    this.grupoEmpresarialService.rechazarGrupoEmpresarial(item).then(data => {
      this.enviarMensajeSnack('Se rechazaron los cambios solicitados en el grupo');
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

}
