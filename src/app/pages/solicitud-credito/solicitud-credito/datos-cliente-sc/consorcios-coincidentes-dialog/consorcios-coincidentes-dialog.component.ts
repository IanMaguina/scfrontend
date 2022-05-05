import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Solicitud } from 'src/app/models/solicitud.interface';
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
  displayedColumns:string[] = [
    'sociedad',
    'razon_social',
  ];
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
    this.listarConsorcios()
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

  async guardarSolicitud(element:any){
    let solicitud:Solicitud = await this.mapeoSolicitud(element);
    this.solicitudService.crear(solicitud).then(async data=>{
      let id_solicitud=data.payload.id;
      console.log("Solicitud--------->"+JSON.stringify(id_solicitud));
      this.cerrarDialog({resultado:"CONFIRM_DLG_YES",grupo:element, solicitud:data.payload});
    })
    
  }

  async mapeoSolicitud(element: any) {
    let solicitud: Solicitud = {
      correlativo: null,
      id_estado: this.ESTADO_SOLICITUD_EN_SOLICITANTE,
      id_rol: this.ROL_SOLICITANTE,
      id_usuario: 12,
      id_usuario_creacion:12,
      id_solicitud_referencia: null,
      sociedad_codigo_sap: null,
      id_cliente_agrupacion: element.id,
      id_empresa: null,
      id_tipo_cliente:1
    }
    return solicitud;
  }

  cerrarDialog(consorcio: any) {
    this.dialogRef.close(consorcio);
  }

}
