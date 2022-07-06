import { EditarGrupoEmpresarialComponent } from './../editar-grupo-empresarial/editar-grupo-empresarial.component';
import { GrupoEmpresarialService } from '../../../../services/grupo-empresarial.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarIntegrantesGrupoComponent } from '../asignar-integrantes-grupo/asignar-integrantes-grupo.component';
import { CrearGrupoEmpresarialComponent } from '../crear-grupo-empresarial/crear-grupo-empresarial.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { AgrupacionClienteSolicitud } from 'src/app/models/agrupacion-cliente-solicitud.interface';
import { AutenticacionService } from '@services/autenticacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario.interface';
import { GlobalSettings } from 'src/app/shared/settings';

const ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO;
@Component({
  selector: 'app-grupo-empresarial',
  templateUrl: './grupo-empresarial.component.html',
  styles: [
  ]
})
export class GrupoEmpresarialComponent implements OnInit {
  listadoGrupos: AgrupacionClienteSolicitud[] = [];

  displayedColumns: string[] = [
    'nombre', 
    'estado_cliente_agrupacion', 
    'usuario_creacion', 
    'estado', 
    'id'
  ];
  userInfo: Usuario;
  id_usuario: number = 0;
  id_perfilLogueo: number = 0;
  PERFIL_ADMINISTRADOR:number = GlobalSettings.PERFIL_ADMINISTRADOR;
  isPerfilAdmin:boolean=false;
  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private grupoEmpresarialService: GrupoEmpresarialService,
    private autenticacionService: AutenticacionService
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario=this.userInfo.id;
    console.log("mi usuario: "+JSON.stringify(this.userInfo));
  }

  ngOnInit(): void {
    this.isAdmin();
    this.listarGruposEmpresariales();
  }

  async listarGruposEmpresariales() {
    await this.grupoEmpresarialService.listarGruposEmpresariales().then(data => { 
      this.listadoGrupos = data.payload;
    })
  }

  openAgregarGrupo() {
    let dialogRef = this.matDialog.open(CrearGrupoEmpresarialComponent, {
      disableClose: true,
      width: '300px',
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.payload.confirm === 'CONFIRM_DLG_YES') {
          this.openAsignarIntegrantesGrupo(result.payload.data);
      } else {
        this.listarGruposEmpresariales();

      }
    });
  }

  async openEditar(form: any) {
    let dialogRef = this.matDialog.open(EditarGrupoEmpresarialComponent, {
      disableClose: true,
      data: form,
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.payload.confirm === 'CONFIRM_DLG_YES') {
          this.openAsignarIntegrantesGrupo(result.payload.data);
      } else {
        this.listarGruposEmpresariales();

      }
    });

  }


  openAsignarIntegrantesGrupo(data: any) {
    this.openDialog(AsignarIntegrantesGrupoComponent, 'no', '80%', data)
  }

  toggleGrupoActivo(element: any) {
    let mensaje: string;

    if (element.activo) {
      mensaje = "¿Desea habilitar el Grupo Empresarial?";
    } else {
      mensaje = "¿Desea deshabilitar el Grupo Empresarial?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let clienteAgrupacion: ClienteAgrupacion = element;
        clienteAgrupacion.id_usuario=this.id_usuario;
        this.grupoEmpresarialService.eliminarGrupoEmpresarial(clienteAgrupacion).then(()=>{
          this.listarGruposEmpresariales();
        });
      }
    });
  }

  openDialog(componente: any, msg: string, width: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width: width,
      data: data ? data : '',
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        if (msg != 'no') {
          this.enviarMensajeSnack(msg);
          this.listarGruposEmpresariales();
        }else{
          this.listarGruposEmpresariales();
        }
      } else {
        this.listarGruposEmpresariales();

      }
    });
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  isAdmin(){
    if(this.id_perfilLogueo===this.PERFIL_ADMINISTRADOR){
      this.isPerfilAdmin = true;
    }
  }

  mostrarEliminar(element) {
    let accionEliminar: boolean = false;
    if (this.userInfo.id_perfil !== this.PERFIL_ADMINISTRADOR && element.id_estado_cliente_agrupacion !== ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO) {
      accionEliminar = true;
    } else {
      if (this.userInfo.id_perfil === this.PERFIL_ADMINISTRADOR && element.id_estado_cliente_agrupacion === ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO) {
        accionEliminar = true;
      } else {
        accionEliminar = false;
      }
    }
    return accionEliminar;
  }  
}