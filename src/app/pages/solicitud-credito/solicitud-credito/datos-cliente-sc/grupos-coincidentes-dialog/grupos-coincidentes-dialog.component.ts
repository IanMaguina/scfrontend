import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solicitud } from 'src/app/models/solicitud.interface';
import {ClienteAgrupacion} from '../../../../../models/cliente-agrupacion.interface';
import {SolicitudService} from '../../../../../services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';
@Component({
  selector: 'app-grupos-coincidentes-dialog',
  templateUrl: './grupos-coincidentes-dialog.component.html',
  styles: [
  ]
})
export class GruposCoincidentesDialogComponent implements OnInit {

  listaGrupos:ClienteAgrupacion[] = [];
  nodata:boolean= false;
  nombre:string;
  rucIntegrante:string;
  ESTADO_SOLICITUD_EN_SOLICITANTE=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ROL_SOLICITANTE=GlobalSettings.ROL_SOLICITANTE;
  constructor(
    public dialogRef: MatDialogRef<GruposCoincidentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService:SolicitudService
  ) {
    this.nombre=data.nombreGrupo;
    this.rucIntegrante=data.rucGrupo;
  }

  ngOnInit() {
    this.listarClienteAgrupacionxNombre();
  }
  listarClienteAgrupacionxNombre(){
    this.solicitudService.listarClienteAgrupacionxNombre(this.nombre).then((data)=>{
      console.log("Listado de grupos empresariales-->"+JSON.stringify(data.payload))
      this.listaGrupos=data.payload;
      if (data.payload.length===0){
        this.nodata=true;
      }
    })

  }
  
  async guardarSolicitud(grupo:any){
    console.log("grupo seleccionado-->"+JSON.stringify(grupo));
    let solicitud:Solicitud = await this.mapeoSolicitud(grupo)
    this.solicitudService.crear(solicitud).then(data=>{
      this.cerrarDialog({grupo:grupo, solicitud:data.payload});
    })
    
  }

  async mapeoSolicitud(grupo: any) {
    let solicitud: Solicitud = {
      correlativo: null,
      id_estado: this.ESTADO_SOLICITUD_EN_SOLICITANTE,
      id_rol: this.ROL_SOLICITANTE,
      id_usuario: 12,
      id_usuario_creacion:12,
      id_solicitud_referencia: null,
      sociedad_codigo_sap: null,
      id_cliente_agrupacion: grupo.id,
      id_empresa: null,
      id_tipo_cliente:1
    }
    return solicitud;
  }

  cerrarDialog(grupo:any){
    this.dialogRef.close(grupo);
  }

}
