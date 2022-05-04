import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';
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
  constructor(
    public dialogRef: MatDialogRef<ConsorciosCoincidentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService:SolicitudService    
  ) {
    //this.listaConsorcios = data.payload;
    this.clienteCodigoSapConsorcio=data.clienteCodigoSapConsorcio;
    this.rucConsorcio=data.rucConsorcio;
  }

  ngOnInit(): void {
    this.listarConsorcios();
  }

  async listarConsorcios(){
    this.solicitudService.listarConsorcioxNumeroDocumentoxFiltros({numero_documento:this.rucConsorcio}).then((data)=>{
      console.log("Listado de Consorcios -->"+JSON.stringify(data.payload))
      this.listaConsorcios=data.payload;
      if (data.payload.length===0){
        this.nodata=true;
      }
    })
  }

  verConsorcio(consorcio: number) {
    this.cerrarDialog(consorcio);
  }

  cerrarDialog(consorcio: number) {
    this.dialogRef.close(consorcio);
  }

}
