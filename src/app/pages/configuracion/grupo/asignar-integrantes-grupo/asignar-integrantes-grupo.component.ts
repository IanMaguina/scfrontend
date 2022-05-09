import { ClienteEmpresaService } from './../../../../services/cliente-empresa.service';
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
    public dialogRef: MatDialogRef<AsignarIntegrantesGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private sociedadService: SociedadService,
    private empresaService: EmpresaService,
    private clienteEmpresaService: ClienteEmpresaService,
    private matDialog: MatDialog,
  ) {
    this.grupoData = data;
    console.log("trayendo del listado--->" + JSON.stringify(this.grupoData));
    this.id_cliente_agrupacion = this.grupoData.id;

    /*  */
    this.asignarEmpresaFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      ruc: ['', Validators.required],
    })
    this.asignarEmpresaFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.asignarEmpresaFormDialog, this.formErrors, this.validationMessages, this.submitted);
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
  asignarEmpresaGrupo(form: any) {
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
        let mensaje:string = "Empresa no registrada";
        if (data.payload.tiene_cliente ){
          let gc=data.payload.cliente.cliente_agrupacion.nombre
          mensaje= "Empresa ya fue asignada al Grupo / Consorcio "+gc;

        }
        const dialogRef2 = this.matDialog.open( ErrorDialogComponent, {
          disableClose: true,
          width:"400px",
          data:mensaje
        });
        /* en realidad no habria return, pero por si acaso, borrar si es necesario */
        dialogRef2.afterClosed().subscribe(result => {
          if(result==='CONFIRM_DLG_YES'){
            console.log("return function process");
          }
        });
      }

    })

  }

  QuitarEmpresa(form: any) {

    form.mensaje = `¿Desea desasignar la empresa: ${form.empresa.razon_social} de este grupo? `;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let id_cliente_empresa = form.id;
        this.clienteEmpresaService.eliminarClienteEmpresa(this.id_cliente_agrupacion, id_cliente_empresa);
      }
      this.listarClienteEmpresa();
    });



  }

  SolicitarActualizarGrupo(){
    console.log("SolicitarActualizarGrupo");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
