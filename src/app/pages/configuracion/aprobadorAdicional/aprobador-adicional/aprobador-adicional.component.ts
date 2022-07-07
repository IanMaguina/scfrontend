import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AprobadorAdicional } from 'src/app/models/aprobador-adicional.interface';
import { AprobadorAdicionalService } from 'src/app/services/aprobador-adicional.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CrearAprobadorAdicionalComponent } from '../crear-aprobador-adicional/crear-aprobador-adicional.component';

@Component({
  selector: 'app-aprobador-adicional',
  templateUrl: './aprobador-adicional.component.html',
  styles: [
  ]
})
export class AprobadorAdicionalComponent implements OnInit {
  listadoAprobadoresAdicionales:AprobadorAdicional[] = [];
  displayedColumns: string[] = ['usuario', 'activo'];


  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private aprobadorAdicionalService: AprobadorAdicionalService,
  ) {

   }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listarAprobadorAdicionales();
  }

  async listarAprobadorAdicionales(){
    this.aprobadorAdicionalService.listarAprobadoresAdicionales().then(data => {
      this.listadoAprobadoresAdicionales = data.payload;
    })
  }
  
  openAgregarAprobadorAdicional(){
    this.openDialog(CrearAprobadorAdicionalComponent,"Se agregó al Aprobador correctamente",'300px','', );

    
  }

  onchangeActividad(element:any){
    let mensaje:string = ""
    if (element.activo) {
      mensaje = "¿Desea habilitar al Aprobador?";
    } else {
      mensaje = "¿Desea deshabilitar al Aprobador?";
    }
    element.mensaje = mensaje;

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width:"300px",
      data:element,
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarAprobadorAdicionales();
      if(result === 'CONFIRM_DLG_YES'){
        this.aprobadorAdicionalService.activarDesactivarAprobadorAdicional(element).then( activado =>{
          if(activado.header.exito){
            this.enviarMensajeSnack("Se cambió la actividad correctamente");
            this.listarAprobadorAdicionales();
          }
        })
       
      }
    });
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'Cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  openDialog(componente: any, msg: string, width:string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width:width,
      data: data?data:'',
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack(msg);
        this.listarAprobadorAdicionales();
      }
    });
  }

}
