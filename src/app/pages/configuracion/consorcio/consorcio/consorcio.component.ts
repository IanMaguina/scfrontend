import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { AgrupacionClienteSolicitud } from 'src/app/models/agrupacion-cliente-solicitud.interface';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { ConsorcioService } from 'src/app/services/consorcio.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';
import { AsignarIntegrantesComponent } from '../asignar-integrantes/asignar-integrantes.component';
import { CrearConsorcioComponent } from '../crear-consorcio/crear-consorcio.component';

@Component({
  selector: 'app-consorcio',
  templateUrl: './consorcio.component.html',
  styles: [
  ]
})
export class ConsorcioComponent implements OnInit {
  listadoConsorcios: AgrupacionClienteSolicitud[] = [];

  displayedColumns: string[] = ['razonsocial', 'pendiente', 'solicitante', 'numero_documento', 'estado', 'id'];

  userInfo: Usuario;
  id_userLogueo: number = 0;
  id_perfilLogueo: number = 0;
  PERFIL_ADMINISTRADOR:number = GlobalSettings.PERFIL_ADMINISTRADOR;
  isPerfilAdmin:boolean=false;
  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private consorcioService: ConsorcioService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.listarConsorcios();
    this.isAdmin();
  }

  async listarConsorcios() {
    this.consorcioService.listarConsorcios().then(data => {
      this.listadoConsorcios = data.payload;
    })
  }

  openAgregarConsorcio() {
    this.openDialog(CrearConsorcioComponent, 'Se agregó el consorcio', '300px');
  }

  openAsignarIntegrantes(id: any) {
    this.openDialog(AsignarIntegrantesComponent, 'no', '80%', id);
  }

  toggleConsorcioActivo(element: any) {
    let mensaje: string;

    if (element.activo) {
      mensaje = "¿Desea habilitar el plan?";
    } else {
      mensaje = "¿Desea deshabilitar el plan?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element,
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let clienteAgrupacion: ClienteAgrupacion = element;
        this.consorcioService.actualizarConsorcio(clienteAgrupacion).then((data) => {
          if (data.header.exito) {
            this.listarConsorcios();
            this.enviarMensajeSnack("se modificó la actividad del Consorcio");
          } else {
            this.listarConsorcios();
          }
        });
      }
    });

  }

  openDialog(componente: any, msg: string, width: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width: width,
      data: data ? data : '',
      panelClass: 'custom_Config'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        if (msg != 'no') {
          this.enviarMensajeSnack(msg);
          this.listarConsorcios();
        }else{
          this.listarConsorcios();
        }
      } else {
        this.listarConsorcios();

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


}
