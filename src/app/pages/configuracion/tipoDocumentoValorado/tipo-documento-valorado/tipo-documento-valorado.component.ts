import { TipoDocumentoValoradoService } from './../../../../services/tipo-documento-valorado.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearTipoDocumentoValoradoComponent } from '../crear-tipo-documento-valorado/crear-tipo-documento-valorado.component';
import { EditarTipoDocumentoValoradoComponent } from '../editar-tipo-documento-valorado/editar-tipo-documento-valorado.component';
import { TipoDocumentoValorado } from 'src/app/models/tipo-documento-valorado.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-documento-valorado',
  templateUrl: './tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class TipoDocumentoValoradoComponent implements OnInit {

  listadoTipoDV: TipoDocumentoValorado[]=[];
  displayedColumns: string[] = ['tipo-documento-valorado'];
  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private tipoDocumentoValoradoService: TipoDocumentoValoradoService

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarTipoDocumentoValorado();
  }

  async listarTipoDocumentoValorado() {
    this.tipoDocumentoValoradoService.listarDocumentosValorados().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoTipoDV = data.payload;
    })

  }

  openAgregarTipoDV() {
    const dialogRef = this.matDialog.open(CrearTipoDocumentoValoradoComponent, {
      disableClose: true,
      width: '300px',
      panelClass: 'custom_Config'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTipoDocumentoValorado();
      console.log("return function process");
    });
  }


  async openEditarTipoDV(element: any) {
    let dialogRef = this.matDialog.open(EditarTipoDocumentoValoradoComponent, {
      disableClose: true,
      width: '300px',
      data: element,
      panelClass: 'custom_Config'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==='OK'){
        this.listarTipoDocumentoValorado();
      }
      
      console.log("return function process -->" + result);
    });

  }
/* 
  onchangeEstado(form: any) {
    let mensaje: string;
    console.log("al editar activo el form: "+JSON.stringify(form));
    if (form.activo) {
      mensaje = "¿Desea habilitar el documento valorado?";
    } else {
      mensaje = "¿Desea deshabilitar el documento valorado?";
    }
    form.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        console.log("realizar la edición");
        this.tipoDocumentoValoradoService.activarDocumentoValorado(form).then( (_)=>{
          this.listarTipoDocumentoValorado();
        })
      }
    });
  } */
  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }


}
