import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '@services/plan.service';
import { SolicitudPlan } from 'src/app/models/solicitud-plan.interface';

@Component({
  selector: 'app-hipotecas-sc',
  templateUrl: './hipotecas-sc.component.html',
  styles: [
  ]
})
export class HipotecasScComponent implements OnInit {

  @Input() id_solicitud_editar: number;
  @Input() listadoHipotecas: SolicitudPlan[];
  displayedColumns: string[] = [
    'sociedad',
    'plan',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'documento_valorado_actual',
    'linea_solicitada',
    'moneda_solicitada',
    'documento_valorado_propuesto',
    'tipo_linea',
    'vigencia',
    'plan_control',
   /*  'id' */
  ]
  constructor(
    private planService:PlanService,
    private _snack:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarPlanSolicitudHipoteca(); 
  }
  listarPlanSolicitudHipoteca(){
    if(this.id_solicitud_editar){
    this.planService.listarPlanSolicitudHipoteca(this.id_solicitud_editar).then(data=>{
      this.listadoHipotecas = data.payload;
      console.log("listado Plan Riesgo"+ JSON.stringify(data.payload));
    })
  }
  }

}
