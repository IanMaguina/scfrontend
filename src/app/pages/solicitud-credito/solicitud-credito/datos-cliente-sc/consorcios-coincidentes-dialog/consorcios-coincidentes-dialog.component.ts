import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-consorcios-coincidentes-dialog',
  templateUrl: './consorcios-coincidentes-dialog.component.html',
  styles: [
  ]
})
export class ConsorciosCoincidentesDialogComponent implements OnInit {
  listaConsorcios: ClienteAgrupacion[] = [];
  nodata: boolean = false;

  ESTADO_SOLICITUD_EN_SOLICITANTE=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ROL_SOLICITANTE=GlobalSettings.ROL_SOLICITANTE;

  clienteCodigoSapConsorcio:string;
  rucConsorcio:string;
  displayedColumns:string[] = [
    'sociedad',
    'razon_social',
  ];
  constructor(
    public dialogRef: MatDialogRef<ConsorciosCoincidentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService:SolicitudService,
    private matDialog:MatDialog,
  ) {
   
    this.clienteCodigoSapConsorcio=data.clienteCodigoSapConsorcio;
    this.rucConsorcio=data.rucConsorcio;
  }

  ngOnInit(): void {
    console.log("datos del consorcio-->"+JSON.stringify(this.data));
    if (this.rucConsorcio){
    this.listarConsorcioxFiltros({numero_documento:this.rucConsorcio})
    }else{
      this.listarConsorcioxFiltros({cliente_codigo_sap:this.clienteCodigoSapConsorcio})
    }
  }

  async listarConsorcioxFiltros(filtro:any){
    this.solicitudService.listarConsorcioxFiltros(filtro).then((data)=>{
      console.log("Listado de Consorcios -->"+JSON.stringify(data.payload))
      if(data.payload){
        if(!data.payload.warning){
          this.listaConsorcios=data.payload;
        }else{
          this.nodata=true;
          this.openAlerta(data.payload.warning.mensaje);
        }
      }
      
     
    })
  }

  async guardarSolicitud(element:any){
    this.cerrarDialog({resultado:"CONFIRM_DLG_YES",grupo:element});    
  }

  cerrarDialog(consorcio: any) {
    this.dialogRef.close(consorcio);
  }

  openAlerta(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: mensaje
    });

  }

}
