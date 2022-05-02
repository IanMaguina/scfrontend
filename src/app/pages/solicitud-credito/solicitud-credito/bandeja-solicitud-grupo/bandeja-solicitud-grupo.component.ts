import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DlgDetalleSolicitudGrupoComponent } from '../dlg-detalle-solicitud-grupo/dlg-detalle-solicitud-grupo.component';

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
  openAsignarIntegrantesGrupo(id:any){
    const dialogRef2 = this.matDialog.open(DlgDetalleSolicitudGrupoComponent, {
      disableClose: true,
      width: '80%',
      data:id
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log("return function process");
    });
  }

}
