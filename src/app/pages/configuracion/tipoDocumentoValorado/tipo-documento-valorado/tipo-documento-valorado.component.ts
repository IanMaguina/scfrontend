import { TipoDocumentoValoradoService } from './../../../../services/tipo-documento-valorado.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearTipoDocumentoValoradoComponent } from '../crear-tipo-documento-valorado/crear-tipo-documento-valorado.component';
import { EditarTipoDocumentoValoradoComponent } from '../editar-tipo-documento-valorado/editar-tipo-documento-valorado.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentoValorado } from 'src/app/models/documento-valorado.interface';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tipo-documento-valorado',
  templateUrl: './tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class TipoDocumentoValoradoComponent implements OnInit {

  listadoDocumentoValorado: DocumentoValorado[]=[];

  displayedColumns: string[] = [
    'nombre',
    'tipo_documento_valorado',
    'activo',
  ];
  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private tipoDocumentoValoradoService: TipoDocumentoValoradoService

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarDocumentoValorado();
  }

  async listarDocumentoValorado() {
    this.tipoDocumentoValoradoService.listarDocumentosValorados().then(data => {
      console.log("listado DV: "+JSON.stringify(data.payload));
      this.listadoDocumentoValorado = data.payload;
    })
  }

  agregarDocumentoValorado() {
    this.openDialog(CrearTipoDocumentoValoradoComponent,'Se creó el Documento Valorado', '300px');
  }

  async editarDocumentoValorado(element: DocumentoValorado) { 
    this.openDialog(EditarTipoDocumentoValoradoComponent,'Se actualizó el Documento Valorado', '300px', element);
  }

  onchangeEstado(form: any) {
    let mensaje: string;
    console.log("al editar activo el form: "+JSON.stringify(form));
    if (form.activo) {
      mensaje = "¿Desea habilitar el documento valorado?";
    } else {
      mensaje = "¿Desea deshabilitar el documento valorado?";
    }
    form.mensaje = mensaje;
    this.openDialog(ConfirmDialogComponent,'Se actualizó la actividad del Documento Valorado', '400px', form);
    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        console.log("realizar la edición");
        this.tipoDocumentoValoradoService.activarDocumentoValorado(form).then( (_)=>{
          this.listarDocumentoValorado();
        })
      }else{
        this.listarDocumentoValorado();
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
        this.listarDocumentoValorado();
      }else{
        this.listarDocumentoValorado();
      }
    });
  }
  

}
