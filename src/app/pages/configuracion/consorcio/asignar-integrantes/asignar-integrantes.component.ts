import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteEmpresa } from 'src/app/models/cliente-empresa.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ClienteEmpresaService } from 'src/app/services/cliente-empresa.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

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
  }
  validationMessages = {
    'sociedad': {
      'required': 'el nombre es requerido.'
    },
    'ruc': {
      'required': 'el Número de documento es requerido.',
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
   

  listadoIntegrantes: any[] = [];

  displayedColumns: string[] = [
    'sociedad',
    'grupo_cliente',
    'razonsocial',
    'ruc',
    'canal', 
    'id',
  ];

  id_cliente_agrupacion: number = null;
  id_usuario: number = 12;
  constructor(
    public dialogRef: MatDialogRef<AsignarIntegrantesComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private sociedadService: SociedadService,
    private empresaService: EmpresaService,
    private clienteEmpresaService: ClienteEmpresaService,
    private matDialog: MatDialog,
  ) {
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
    await this.clienteEmpresaService.listarEmpresas(this.id_cliente_agrupacion).then(data => {
      console.log("listarClienteEmpresas:" + JSON.stringify(data));
      this.listadoIntegrantes = data.payload;
    })

  }
  async callWarningDialog(mensaje:string){

     this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje
    });

  }



  asignarEmpresaConsorcio(form: any) {
    console.log("asignarEmpresaGrupo-->" + JSON.stringify(form));
    this.empresaService.buscarEmpresa(form.sociedad.codigo_sap, form.ruc).then(data => {
      console.log("data--->" + JSON.stringify(data));
      if (data.header.exito) {
        console.log("se encontro--->" + JSON.stringify(data.payload));
        let clienteEmpresa: ClienteEmpresa = {
          "id_cliente_agrupacion": this.id_cliente_agrupacion,
          "id_empresa": data.payload[0].id,
          "id_usuario_creacion": this.id_usuario
        }
        let mensaje: string = "";
        if (data.payload.tiene_cliente) {
          let gc = data.payload.cliente.cliente_agrupacion.nombre
          mensaje = `Empresa ya fue asignada al Grupo / Consorcio : + ${gc}`;
          this.callWarningDialog(mensaje);

        } else {
          this.clienteEmpresaService.crearClienteEmpresa(clienteEmpresa).then((res) => {
            this.limpiarCampos();
            this.listarClienteEmpresa();
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

  QuitarEmpresa(form: any) {
    form.mensaje = `¿Desea desasignar la empresa: ${form.empresa.razon_social} de este consorcio? `;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let id_cliente_empresa = form.id;
        this.clienteEmpresaService.eliminarClienteEmpresa(this.id_cliente_agrupacion, id_cliente_empresa,this.id_usuario).then(data=>{
         
          this.listarClienteEmpresa();
          
        });
      }
    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adjuntarParticipacion(any) {
    console.log("");
  }

  onFileSelected(any) {
    console.log("");
  }

  /* SolicitarActualizarConsorcio(){
    console.log("SolicitarActualizarConsorcio");
  } */
  AprobarConsorcio(){
    console.log("AprobarConsorcio");
  }
  RechazarConsorcio(){
    console.log("RechazarConsorcio");
  }
  limpiarCampos(){
    this.asignarEmpresaFormDialog.reset();
  }

}

