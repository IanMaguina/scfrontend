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

@Component({
  selector: 'app-grupo-empresarial',
  templateUrl: './grupo-empresarial.component.html',
  styles: [
  ]
})
export class GrupoEmpresarialComponent implements OnInit {
  listadoGrupos: AgrupacionClienteSolicitud[] = [];

  displayedColumns: string[] = ['nombre', 'estado_cliente_agrupacion', 'usuario_creacion', 'estado', 'id'];
  userInfo: any;
  id_userLogueo: number = 0;
  id_perfilLogueo: number = 0;

  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private grupoEmpresarialService: GrupoEmpresarialService,
    private autenticacionService: AutenticacionService
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
  }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarGruposEmpresariales();
  }

  async listarGruposEmpresariales() {
    await this.grupoEmpresarialService.listarGruposEmpresariales().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoGrupos = data.payload;
    })
  }

  openAgregarGrupo() {
    this.openDialog(CrearGrupoEmpresarialComponent, 'Se agregó el grupo empresarial', '300px');
  }

  openAsignarIntegrantesGrupo(id: any) {
    this.openDialog(AsignarIntegrantesGrupoComponent, 'no', '80%', id)
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
        this.grupoEmpresarialService.actualizarGrupoEmpresarial(clienteAgrupacion);
        this.listarGruposEmpresariales();

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
        }
        this.listarGruposEmpresariales();
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

}