import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguimiento-solicitud-credito',
  templateUrl: './seguimiento-solicitud-credito.component.html',
  styles: [
  ]
})
export class SeguimientoSolicitudCreditoComponent implements OnInit {
  listadoSeguimiento:any[]=[];
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
  constructor() { }

  ngOnInit(): void {
  }
  onNoClick(){
    
  }
}
