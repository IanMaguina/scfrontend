import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'src/app/models/plan.interface';
import { PlanService } from 'src/app/services/plan.service';
import { AsignarAprobadoresComponent } from '../asignar-aprobadores/asignar-aprobadores.component';

@Component({
  selector: 'app-flujo-aprobacion',
  templateUrl: './flujo-aprobacion.component.html',
  styles: [
  ]
})
export class FlujoAprobacionComponent implements OnInit {
  @Input() plan: Plan;
  listadoTipoFlujoAprobacion:any[]=[
    {id:1, documentovalorado:'Cheque', aprobadores:'Rafa, Felipe, Rian'},
    {id:2, documentovalorado:'Carta Fianza', aprobadores:'Rafa, Felipe, Rian'},
    {id:3, documentovalorado:'Letra', aprobadores:'Rafa, Felipe, Rian'},
    {id:4, documentovalorado:'pagaré', aprobadores:'Rafa, Felipe, Rian'},
  ];
  displayedColumns:string[]= ['documentovalorado','aprobadores'];


  constructor( 
    private matDialog: MatDialog,
    private planService: PlanService
    ) { }

  ngOnInit(): void {
    //this.listarPlanDocumentoValorado();
  }

  async listarPlanDocumentoValorado() {
    this.planService.listarPlanDocumentoValorado(this.plan.id).then(data => {
      this.listadoTipoFlujoAprobacion = data.payload;
      console.log("listarPlanDocumentoValorado-->"+JSON.stringify(this.listadoTipoFlujoAprobacion));
    })
  }


  editarAprobadores(element:any){
    let item = {
      plan:1, 
      documento:element.id
    }
    const dialogRef2 = this.matDialog.open(AsignarAprobadoresComponent, {
      disableClose: true,
      width: '60%',
      data:item,
    });

    dialogRef2.afterClosed().subscribe(result => {
      /* listar documentos - aprobadores actualizados */
      console.log("return function process");
    });
  }

}
