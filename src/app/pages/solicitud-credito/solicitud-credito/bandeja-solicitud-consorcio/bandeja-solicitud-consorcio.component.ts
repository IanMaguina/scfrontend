import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DlgDetalleSolicitudConsorcioComponent } from '../dlg-detalle-solicitud-consorcio/dlg-detalle-solicitud-consorcio.component';

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
    private matDialog: MatDialog,
   //private solicitudConsorcioService:SolicitudConsorcioService
  ) {
   
    
   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  buscarSolicitudes(form:any){
    console.log("buscarSolicitudes:.."+JSON.stringify(form));
  }
  openAsignarIntegrantes(id:any){
    const dialogRef2 = this.matDialog.open(DlgDetalleSolicitudConsorcioComponent, {
      disableClose: true,
      width: '80%',
      data:id
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log("return function process");
     
    });

  }

}
