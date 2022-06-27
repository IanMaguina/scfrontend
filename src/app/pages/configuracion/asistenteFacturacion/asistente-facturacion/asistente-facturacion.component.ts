import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsistenteFacturacion } from 'src/app/models/asistente-facturacion.interface';
import { AsistenteFacturacionService } from 'src/app/services/asistente-facturacion.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CrearAsistenteFacturacionComponent } from '../crear-asistente-facturacion/crear-asistente-facturacion.component';
import { EditarAsistenteFacturacionComponent } from '../editar-asistente-facturacion/editar-asistente-facturacion.component';

@Component({
  selector: 'app-asistente-facturacion',
  templateUrl: './asistente-facturacion.component.html',
  styles: [
  ]
})
export class AsistenteFacturacionComponent implements OnInit {
  listadoAsistentesFacturacion: AsistenteFacturacion[];

  displayedColumnsSociedad: string[] = ['usuario', 'zonal', 'activo'];
  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private asistenteFacturacionService: AsistenteFacturacionService,

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarAsistentesFacturacion();
  }
  async listarAsistentesFacturacion() {
    await this.asistenteFacturacionService.listarAsistentesFacturacion().then((data) => {
      this.listadoAsistentesFacturacion = data.payload;
    });
  }
  openAgregarAsistenteFacturacion() {
    const dialogRef = this.matDialog.open(CrearAsistenteFacturacionComponent, {
      disableClose: true,
      width: "300px",
      panelClass: 'custom_Config'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarAsistentesFacturacion();
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack("se agregó el asistente Facturacion correctamente");
      }
    });
  }

  onchangeEstado(form: any) {
    let mensaje: string;

    if (form.activo) {
      mensaje = "¿Desea habilitar el asistente de facturacion?";
    } else {
      mensaje = "¿Desea deshabilitar el asistente de facturacion?";
    }
    form.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "350px",
      data: form,
    });

    dialogRef3.afterClosed().subscribe(result => {
      this.listarAsistentesFacturacion();
      if (result === 'CONFIRM_DLG_YES') {
        this.asistenteFacturacionService.activarDesactivarAsistenteFacturacion(form).then((data) => {
          if (data.header.exito) {
            this.enviarMensajeSnack("Se actualizó la actividad del asistente de facturacion");
            this.listarAsistentesFacturacion();
          }
        });
      }else{
        this.listarAsistentesFacturacion();
      }
    });
  }

  openEditarAsistenteFacturacion(element: AsistenteFacturacion) {
    console.log("al editar: .. " + JSON.stringify(element));
    const dialogRef4 = this.matDialog.open(EditarAsistenteFacturacionComponent, {
      disableClose: true,
      width: "300px",
      data: element,
      panelClass: 'custom_Config'
    });

    dialogRef4.afterClosed().subscribe(result => {
      this.listarAsistentesFacturacion();
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack("se actualizó el asistente Facturacion correctamente");
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
