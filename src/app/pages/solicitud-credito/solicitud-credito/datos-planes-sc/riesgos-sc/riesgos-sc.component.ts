import { Component, Input, OnInit } from '@angular/core';
import { PlanService } from '@services/plan.service';
import { SolicitudPlan } from 'src/app/models/solicitud-plan.interface';


@Component({
  selector: 'app-riesgos-sc',
  templateUrl: './riesgos-sc.component.html',
  styles: [
  ]
})
export class RiesgosScComponent implements OnInit {
  @Input() id_solicitud_editar: number;
  listadoRiesgos:  SolicitudPlan[] =[];

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
    'id'
  ]
  constructor(
    private planService:PlanService
    ) { }

  ngOnInit(): void {   
    this.listarPlanSolicitudRiesgo();
  }

  listarPlanSolicitudRiesgo(){
    if(this.id_solicitud_editar){
    this.planService.listarPlanSolicitudRiesgo(this.id_solicitud_editar).then(data=>{
      this.listadoRiesgos = data.payload.data?data.payload.data:[];
      console.log("listado Plan Riesgo"+ JSON.stringify(data.payload));
    })
  }
  }

  editarPlan() {
    console.log("editarPlan");
  }

}
