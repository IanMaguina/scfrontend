import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandeja-solicitud-grupo',
  templateUrl: './bandeja-solicitud-grupo.component.html',
  styles: [
  ]
})
export class BandejaSolicitudGrupoComponent implements OnInit {

  listadoSolicitudGrupos:any[]=[];
  displayedColumns:string[] = [
    'estado',
    'nombre',
    'fecha_solicitud',
    'solicitante'
  ];

  
  //Submitted form
  submitted = false;
  carga: boolean = false;
  constructor(
   //private solicitudConsorcioService:SolicitudConsorcioService
  ) {
   
    
   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  buscarSolicitudes(form:any){
    console.log("buscarSolicitudes:.."+JSON.stringify(form));
  }

}
