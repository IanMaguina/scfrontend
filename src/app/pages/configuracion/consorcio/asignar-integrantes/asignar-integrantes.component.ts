import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteEmpresa } from 'src/app/models/cliente-empresa.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ClienteEmpresaService } from 'src/app/services/cliente-empresa.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from 'src/app/services/sociedad.service';

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
  listadoSociedades: Sociedad[] = [
    { codigo_sap: '0011', nombre: 'sociedad 1' },
    { codigo_sap: '0012', nombre: 'sociedad 2' },
  ];

  listadoIntegrantes: any[] = [];

  displayedColumns: string[] = [
    'sociedad',
    'codigocliente',
    'razonsocial',
    'ruc',
    'canal',
    'zonal',
    'grupo_cliente',
    'id',
  ];

  id_cliente_agrupacion: number = null;
  constructor(
    public dialogRef: MatDialogRef<AsignarIntegrantesComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private sociedadService: SociedadService,
    private empresaService: EmpresaService,
    private clienteEmpresaService: ClienteEmpresaService    
  ) {
    this.consorcioData = data;
    console.log("trayendo del listado--->" + JSON.stringify(this.consorcioData));
    this.id_cliente_agrupacion = this.consorcioData.id;

    /*  */
    this.asignarEmpresaFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      ruc: ['', Validators.required],
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
    this.clienteEmpresaService.listarEmpresas(this.id_cliente_agrupacion).then(data => {
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
          "id_cliente_agrupacion": this.id_cliente_agrupacion,
          "id_empresa": data.payload.id
        }
        this.clienteEmpresaService.crearClienteEmpresa(clienteEmpresa);
      } else {
        console.log("No se encontró EMPRESA");
      }

    })

  }

  QuitarEmpresa(form: any) {
    console.log("QuitarEmpresa-->"+JSON.stringify(form));
    let id_cliente_empresa=form.id;
    this.clienteEmpresaService.eliminarClienteEmpresa(this.id_cliente_agrupacion,id_cliente_empresa);
    this.listarClienteEmpresa();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adjuntarParticipacion(any){
    console.log("");
  }

  onFileSelected(any){
    console.log("");
  }
}

