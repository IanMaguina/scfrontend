import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ClienteAgrupacion} from '../../../../../models/cliente-agrupacion.interface';
import {SolicitudService} from '../../../../../services/solicitud.service';
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
      //this.cerrarDialog(data);  
    })

  }
  verConsorcio(grupo:number){
    this.cerrarDialog(grupo);
  }

  cerrarDialog(grupo:number){
    this.dialogRef.close(grupo);
  }

}
