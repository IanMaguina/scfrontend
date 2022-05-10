import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GrupoEmpresarialService } from 'src/app/services/grupo-empresarial.service';
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
    'nombre',
    'fecha_modificacion',
    'cambios',
  ];

  
  //Submitted form
  submitted = false;
  carga: boolean = false;
  constructor(
    private matDialog: MatDialog,
    private grupoEmpresarialService:GrupoEmpresarialService,
  ) {
   
    
   }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listarSolicitudesGrupoPendientes();
  }
  listarSolicitudesGrupoPendientes(){
    this.grupoEmpresarialService.listarSolicitudesGruposPendientes().then( data=>{
     this.listadoSolicitudGrupos = data;
      console.log("mis solicitudes: "+ JSON.stringify(data));
    });

  }

  buscarSolicitudes(form:any){
    console.log("buscarSolicitudes:.."+JSON.stringify(form));
    this.openAsignarIntegrantesGrupo(form);

  }
  openAsignarIntegrantesGrupo(form:any){
    const dialogRef2 = this.matDialog.open(DlgDetalleSolicitudGrupoComponent, {
      disableClose: true,
      width: '80%',
      data:form
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log("return function process");
    });
  }

}
