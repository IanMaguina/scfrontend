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
  selector: 'app-dlg-detalle-solicitud-grupo',
  templateUrl: './dlg-detalle-solicitud-grupo.component.html',
  styles: [
  ]
})
export class DlgDetalleSolicitudGrupoComponent implements OnInit {

 
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
    'accion',
    'fecha_modificacion',
    'razonsocial',
    'usuario_modificacion',
    'estado_aprobacion',
    'id',
  ];

  id_cliente_agrupacion: number = null;
  constructor(
    public dialogRef: MatDialogRef<DlgDetalleSolicitudGrupoComponent>,
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
    this.id_cliente_agrupacion = this.grupoData.id_cliente_agrupacion;

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
    this.listarClienteEmpresa();
  }



  async listarClienteEmpresa() {
    this.listadoIntegrantes = this.grupoData.empresas

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

  AprobarCambio(element:any){

  }
  RechazarCambio(element:any){

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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
