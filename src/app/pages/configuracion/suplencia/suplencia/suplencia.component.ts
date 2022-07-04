import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Suplencia } from 'src/app/models/suplencia.interface';
import { SuplenciaService } from 'src/app/services/suplencia.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CrearSuplenciaComponent } from '../crear-suplencia/crear-suplencia.component';
import { EditarSuplenciaComponent } from '../editar-suplencia/editar-suplencia.component';

@Component({
  selector: 'app-suplencia',
  templateUrl: './suplencia.component.html',
  styles: [
  ]
})
export class SuplenciaComponent implements OnInit {
  listadoSuplencias:Suplencia[]=[];

  displayedColumns: string[] = ['usuario', 'usuario_suplente', 'fecha_inicio', 'fecha_fin', 'activo'];
  
  
  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private suplenciaService:SuplenciaService
  ) { }

  ngOnInit(): void {
    this.listarSuplencias();
  }


  async listarSuplencias() {
    console.log("listarSuplencias");
    this.suplenciaService.listarSuplencia().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoSuplencias = data.payload;
    })

  }

  openAgregarSuplencia(): void {
    let dialogRef = this.matDialog.open(CrearSuplenciaComponent, {
      disableClose: true,
      width:'400px',
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        this.enviarMensajeSnack("Se creó la suplencia correctamente");
      }
      this.listarSuplencias();
     
    });


  }

  async toggleSuplenciaEstado(element: any) {
    console.log("objeto a inactivar" + JSON.stringify(element));
    let mensaje:string;
    if(element.activo){
      mensaje = "¿Desea habilitar la suplencia?";
    }else{
      mensaje = "¿Desea deshabilitar la suplencia?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"400px",
      data:element,
      panelClass: 'SuplenciaPopUP',
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        console.log("ACTUALIZAR EL ACTIVO");
        let suplencia:Suplencia=element;
        suplencia.activo=(element.activo?true:false);
        this.suplenciaService.actualizarActivo(suplencia).then((result)=>{
          if(result.header.exito){
            this.enviarMensajeSnack("Se actualizó la suplencia");
            this.listarSuplencias();
          }
        });
      }else{
        this.listarSuplencias();
      }
      
    });

  }

  async openEditarSuplencia(form: any) {
    console.log("al editar usuario: " + JSON.stringify(form));
    let dialogRef = this.matDialog.open(EditarSuplenciaComponent, {
      disableClose: true,
      data: form,
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        this.enviarMensajeSnack("Se actualizó la suplencia correctamente");
        this.listarSuplencias();
      }else{
        this.listarSuplencias();
      }
    });

  }


  
  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'Cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }


}
