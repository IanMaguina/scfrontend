import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudService } from '@services/solicitud.service';
import { SeguimientoSolicitud } from 'src/app/models/seguimiento-solicitud.interface';

@Component({
  selector: 'app-seguimiento-solicitud-credito',
  templateUrl: './seguimiento-solicitud-credito.component.html',
  styles: [
  ]
})
export class SeguimientoSolicitudCreditoComponent implements OnInit {
  listadoSeguimiento:SeguimientoSolicitud[]=[];
  listadoFlujo:any[]=[]
  displayedColumns:string[]=[
    'accion',
    'fecha',
    'responsable',
    'motivo',
  ];
  displayedColumnsF:string[]=[
    'completado',
     'estado',
     'responsable',
  ];

  id_solicitud:number;
  constructor(
    public dialogRef: MatDialogRef<SeguimientoSolicitudCreditoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private solicitudService:SolicitudService
  ) { 
    this.id_solicitud = data;
  }

  ngOnInit(): void {
    this.listarSeguimiento();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  listarSeguimiento(){
    console.log("id_solicitud seguimiento es :"+this.id_solicitud);
    this.solicitudService.listarSeguimientoSolicitud(this.id_solicitud).then( data => {
      this.listadoSeguimiento = data.payload;
    })
  } 
}
