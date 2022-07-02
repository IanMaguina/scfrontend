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
    'zonal',
    'grupo_cliente',
    'estado_cliente_agrupacion',
    'id',
  ];
  userInfo: any;
  id_cliente_agrupacion: number = null;
  id_usuario:number;
  isAdmin: boolean = false;
  PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;

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
    console.log("ARSA-->"+JSON.stringify(data));
    this.id_cliente_agrupacion = this.grupoData.id;
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario = this.userInfo.id;
    if(this.userInfo.id_perfil === this.PERFIL_ADMINISTRADOR){
      this.isAdmin = true;
    }else{
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
    })
  }  


  asignarEmpresaGrupo(form: any) {
    console.log("asignarEmpresaGrupo-->" + JSON.stringify(form));
    this.empresaService.buscarEmpresa(form.sociedad.codigo_sap, form.ruc).then(data => {
      console.log("data--->" + JSON.stringify(data));
      if (data.header.exito) {
        console.log("se encontro--->" + JSON.stringify(data.payload));
        if (data.payload){
        let clienteEmpresa: ClienteEmpresa = {
          id_cliente_agrupacion: this.id_cliente_agrupacion,
          id_empresa: data.payload.id,
          id_usuario_creacion: this.id_usuario,
          id_usuario: this.id_usuario,
        }
        
        
        this.clienteEmpresaService.crearClienteEmpresa(clienteEmpresa).then(res=>{
          this.enviarMensajeSnack('Se agregó la empresa al grupo')
          this.limpiarCampos();
          this.listarClienteEmpresa();

/*           if(!res.payload.warning){
            this.enviarMensajeSnack('Se agregó la empresa al grupo')
            this.limpiarCampos();
            this.listarClienteEmpresa();

          }else{
            this.enviarMensajeSnack(res.payload.warning.mensaje);
            this.limpiarCampos();
            this.listarClienteEmpresa();
          }
 */        });
      }else{
        let mensaje:string = "Empresa no registrada";
        const dialogRef2 = this.matDialog.open( ErrorDialogComponent, {
          disableClose: true,
          width:"400px",
          data:mensaje
        });
        /* en realidad no habria return, pero por si acaso, borrar si es necesario */
        dialogRef2.afterClosed().subscribe(result => {
          this.limpiarCampos();
          this.listarClienteEmpresa();
        });

      }
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
          this.limpiarCampos();
          this.listarClienteEmpresa();
        });
      }

    })

  }

  QuitarEmpresa(element: any) {

    element.mensaje = `¿Desea desasignar la empresa: ${element.empresa.razon_social} de este grupo? `;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let clienteEmpresa: ClienteEmpresa={
          id: element.id,
          id_cliente_agrupacion: element.id_cliente_agrupacion,
          id_usuario:this.id_usuario,
        } 
        this.clienteEmpresaService.eliminarClienteEmpresa(clienteEmpresa, this.id_usuario).then( data =>{
         if(data.header.exito){
          this.enviarMensajeSnack('Se retiró la empresa');
          this.listarClienteEmpresa();
         }
          
        });
      }else{
        this.listarClienteEmpresa();
      }
    });



  }



  AprobarGrupo(){
    console.log("AprobarGrupo");
    let item:ClienteAgrupacion = {
      id_usuario:this.id_usuario,
      id:this.id_cliente_agrupacion
    }
    this.grupoEmpresarialService.aprobarGrupoEmpresarial(item).then( data => {
      console.log("ARSA warning-->"+JSON.stringify(data));      
      this.enviarMensajeSnack('Se aprobaron los cambios solicitados en el grupo');
      //this.listarClienteEmpresa();
      this.onNoClick('CONFIRM_DLG_YES'); 

/*       if(data.payload.warning){
        this.enviarMensajeSnack(data.payload.warning.mensaje);
        this.listarClienteEmpresa();
      }else{
        this.enviarMensajeSnack('Se aprobaron los cambios solicitados en el grupo');
        this.listarClienteEmpresa();
      }
 */    })
  }

  RechazarGrupo(){
    console.log("RechazarGrupo");
    let item:ClienteAgrupacion = {
      id_usuario:this.id_usuario,
      id:this.id_cliente_agrupacion
    }
    this.grupoEmpresarialService.rechazarGrupoEmpresarial(item).then( data => {
      console.log("ARSA warning RechazarGrupo-->"+JSON.stringify(data));   
      this.enviarMensajeSnack('Se rechazaron los cambios solicitados en el grupo');
      this.onNoClick('CONFIRM_DLG_YES'); 
/*       if(data.payload.warning){
        this.enviarMensajeSnack(data.payload.warning.mensaje);
        this.listarClienteEmpresa();
      }else{
        this.enviarMensajeSnack('Se rechazaron los cambios solicitados en el grupo');
        this.listarClienteEmpresa();
      } */
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
  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }
  limpiarCampos(){
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
