import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgrupacionClienteSolicitud } from 'src/app/models/agrupacion-cliente-solicitud.interface';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { ConsorcioService } from 'src/app/services/consorcio.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
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
  /*  {
     'razonsocial':'010101',
     
     'ruc':'654321987564',
     'id':1, 
     'estado':'activo'
   }
 ]; */
  displayedColumns: string[] = ['razonsocial', 'pendiente', 'solicitante', 'ruc', 'estado', 'id'];


  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private consorcioService: ConsorcioService
  ) { }

  ngOnInit(): void {
    this.listarConsorcios();
  }

  async listarConsorcios() {
    this.consorcioService.listarConsorcios().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoConsorcios = data.payload;
    })
  }

  openAgregarConsorcio() {
    this.openDialog(CrearConsorcioComponent, 'Se agregó el consorcio', '');
  }

  openAsignarIntegrantes(id: any) {
    this.openDialog(AsignarIntegrantesComponent, 'Se asignó el consorcio', '80%',id);
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
        this.consorcioService.activarConsorcio(clienteAgrupacion).then((data) => {
          if (data.header.exito === true) {
            this.listarConsorcios();
          }
        });
      }
    });
    
  }

  openDialog(componente: any, msg: string, width:string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width:width,
      data: data?data:'',
      panelClass: 'custom_Config'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack(msg);
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




}
