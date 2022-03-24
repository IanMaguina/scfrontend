import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private aprobadorAdicionalService: AprobadorAdicionalService,
  ) {

   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  async listarAprobadorAdicionales(){
    this.aprobadorAdicionalService.listarAprobadoresAdicionales().then(data => {
      this.listadoAprobadoresAdicionales = data.payload;
    })
  }
  
  openAgregarAprobadorAdicional(){
    const dialogRef = this.matDialog.open(CrearAprobadorAdicionalComponent, {
      disableClose: true,
      width:"300px",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarAprobadorAdicionales();
      if(result === 'CONFIRM_DLG_YES'){
        
        console.log("se agregó el Aprobador correctamente");
      }
    });
  }
  onchangeActividad(element:any){
    let mensaje:string = ""
    if (element.activo) {
      mensaje = "¿Desea habilitar el Aprobador?";
    } else {
      mensaje = "¿Desea deshabilitar el Aprobador?";
    }
    element.mensaje = mensaje;

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width:"300px",
      data:element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarAprobadorAdicionales();
      if(result === 'CONFIRM_DLG_YES'){
        this.aprobadorAdicionalService.activarDesactivarAprobadorAdicional(element).then( activado =>{
          if(activado.header.exito){
            console.log("se cambió la actividad correctamente");
          }
        })
       
      }
    });
  }

  

}
