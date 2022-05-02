import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bandeja-solicitud-consorcio',
  templateUrl: './bandeja-solicitud-consorcio.component.html',
  styles: [
  ]
})
export class BandejaSolicitudConsorcioComponent implements OnInit {

  listadoSolicitudConsorcios:any[]=[];
  displayedColumns:string[] = [
    'estado',
    'numero_documento',
    'razon_social',
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
