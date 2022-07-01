import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { ConsorcioService } from '@services/consorcio.service';
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
    'sociedad': '',
    'ruc': '',
    'participacion': '',
  }
  validationMessages = {
    'sociedad': {
      'required': 'Sociedad es requerida.'
    },
    'ruc': {
      'required': 'el Número de documento es requerido.',
    },
    'participacion': {
      'required': 'la participación es requerida.',
    }
  };
  /* Participacion */
  participacionFormDialog: any;
  formErrorsP = {
    'files': '',
    'descripcion': '',
  }
  validationMessagesP = {
    'files': {
      'required': ' files es requerido.'
    },
    'descripcion': {
      'required': ' descripcion es requerido.',
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
    'sociedad',
    'grupo_cliente',
    'razonsocial',
    'ruc',
    'canal',
    'participacion',
    'estado_cliente_agrupacion',
    'id',
  ];
  userInfo: any;
  id_cliente_agrupacion: number = null;
  id_usuario: number;
  isAdmin: boolean = false;
  PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;

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
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario = this.userInfo.id;
    if (this.userInfo.id_perfil === this.PERFIL_ADMINISTRADOR) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.consorcioData = data;
    console.log("trayendo del listado--->" + JSON.stringify(this.consorcioData));
    this.id_cliente_agrupacion = this.consorcioData.id;

    /*  */
    this.asignarEmpresaFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      ruc: ['', Validators.required],
      participacion: ['', Validators.required],
    })
    this.asignarEmpresaFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.asignarEmpresaFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
    /*  */
    this.participacionFormDialog = this.formBuilder.group({
      files: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    this.participacionFormDialog.valueChanges.subscribe(() => {
      this.formErrorsP = this.formValidatorService.handleFormChanges(this.participacionFormDialog, this.formErrorsP, this.validationMessagesP, this.submitted2);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listarSociedades();
    this.listarClienteEmpresa();
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
    console.log("asignarEmpresaGrupo-->" + JSON.stringify(form));
    this.empresaService.buscarEmpresa(form.sociedad.codigo_sap, form.ruc).then(data => {
      console.log("data--->" + JSON.stringify(data));
      if (data.header.exito) {
        console.log("se encontro--->" + JSON.stringify(data.payload));
        let clienteEmpresa: ClienteEmpresa = {
          id:form.id,
          id_cliente_agrupacion: this.id_cliente_agrupacion,
          id_empresa: data.payload[0].id,
          id_usuario_creacion: this.id_usuario,
          id_usuario: this.id_usuario,
          participacion: form.participacion
        }
        let mensaje: string = "";
        if (data.payload.tiene_cliente) {
          let gc = data.payload.cliente.cliente_agrupacion.nombre
          mensaje = `Empresa ya fue asignada al Grupo / Consorcio : + ${gc}`;
          this.callWarningDialog(mensaje);

        } else {
          this.clienteEmpresaService.crearClienteEmpresa(clienteEmpresa).then((res) => {
            if(!res.payload.warning){
              this.enviarMensajeSnack('Se agregó la empresa');
              this.limpiarCampos();
            this.listarClienteEmpresa();
            }else{
              this.limpiarCampos();
              this.listarClienteEmpresa();
            }            
          });
        }
      } else {
        let mensaje: string = "Empresa no registrada";
        if (data.payload.tiene_cliente) {
          let gc = data.payload.cliente.cliente_agrupacion.nombre
          mensaje = `Empresa ya fue asignada al Grupo / Consorcio : + ${gc}`;
        }
        this.callWarningDialog(mensaje);
      }
    })
  }

  QuitarEmpresa(element: any) {
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
          id_usuario:this.id_usuario,
        }
        this.clienteEmpresaService.eliminarClienteEmpresa(clienteEmpresa, this.id_usuario).then(data => {
          if (!data.payload.warning) {
            this.enviarMensajeSnack('Se retiró la empresa');
            this.listarClienteEmpresa();
          } else {
            this.listarClienteEmpresa();
          }
        });
      } else {
        this.listarClienteEmpresa();
      }
    });


  }

  onNoClick(msg: string): void {
    this.dialogRef.close(msg);
  }

  adjuntarParticipacion(any) {
    console.log("");
  }

  onFileSelected(any) {
    console.log("");
  }


  AprobarConsorcio() {
    let item: ClienteAgrupacion = {
      id_usuario: this.id_usuario,
      id: this.id_cliente_agrupacion
    }
    this.consorcioService.aprobarConsorcio(item).then(data => {
      if (!data.payload.warning) {
        this.enviarMensajeSnack('Se aprobaron los cambios solicitados en el consorcio');
        this.listarClienteEmpresa();
      } else {
        this.enviarMensajeSnack(data.payload.warning.mensaje);
        this.listarClienteEmpresa();
      }
    })
  }

  RechazarConsorcio() {
    let item: ClienteAgrupacion = {
      id_usuario: this.id_usuario,
      id: this.id_cliente_agrupacion
    }
    this.consorcioService.rechazarConsorcio(item).then(data => {
      if (!data.payload.warning) {
        this.enviarMensajeSnack('Se rechazaron los cambios solicitados en el consorcio');
        this.listarClienteEmpresa();
      } else {
        this.enviarMensajeSnack(data.payload.warning.mensaje);
        this.listarClienteEmpresa();
      }
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

  limpiarCampos() {
    this.asignarEmpresaFormDialog.reset();
  }
  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

}

