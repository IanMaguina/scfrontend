import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private asistenteFacturacionService: AsistenteFacturacionService,

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarAsistentesFacturacion();
  }
  async listarAsistentesFacturacion(){
    await this.asistenteFacturacionService.listarAsistentesFacturacion().then( (data) => {
      this.listadoAsistentesFacturacion = data.payload;
    });
  }
  openAgregarAsistenteFacturacion(){
    const dialogRef = this.matDialog.open(CrearAsistenteFacturacionComponent, {
      disableClose: true,
      width:"300px",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarAsistentesFacturacion();
      if(result === 'CONFIRM_DLG_YES'){
        
        console.log("se agregó el asistenteFacturacion correctamente");
      }
    });
  }
  

  onchangeEstado(form:any){
    let mensaje:string;
    
    if(form.activo){
      mensaje = "¿Desea habilitar el asistente de facturacion?";
    }else{
      mensaje = "¿Desea deshabilitar el asistente de facturacion?";
    }
    form.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"250px",
      data:form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        console.log("sending.."+JSON.stringify(form));
        this.asistenteFacturacionService.activarDesactivarAsistenteFacturacion(form).then((data)=>{
          if(data.header.exito){
            console.log("Se actualizó la actividad del asistente de facturacion");
            this.listarAsistentesFacturacion();
          }
        });
      }
    });
  }


  openEditarAsistenteFacturacion(element:AsistenteFacturacion){
    console.log("al editar: .. "+JSON.stringify(element));
    const dialogRef4 = this.matDialog.open(EditarAsistenteFacturacionComponent, {
      disableClose: true,
      width:"300px",
      data:element,
    });

    dialogRef4.afterClosed().subscribe(result => {
      this.listarAsistentesFacturacion();
      if(result === 'CONFIRM_DLG_YES'){
        
        console.log("se editó el asistenteFacturacion correctamente");
      }
    });
  }



}
