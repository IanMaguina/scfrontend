import { Component, OnInit } from '@angular/core';

export interface PlanRiesgo{
  id?: number,
  sociedad:string,
  plan?: string,
  razon_social?:string,
  grupo_cliente?:string,
  linea_credito_actual?:string,
  documento_valorado_actual?:string,
  linea_solicitada?:string,
  moneda_solicitada?:string,
  documento_valorado_propuesto?:string,
  tipo_linea?:string,
  vigencia?:string,
  plan_control?:string,
};
@Component({
  selector: 'app-riesgos-sc',
  templateUrl: './riesgos-sc.component.html',
  styles: [
  ]
})
export class RiesgosScComponent implements OnInit {
  listadoRiesgos: PlanRiesgo[] =[
    {
      id:1,
      sociedad:'2020',
      plan:'Fuera de plan',
      razon_social:'XYZ SA',
      grupo_cliente:'KAM',
      linea_credito_actual:'s/.20000',
      documento_valorado_actual:'Cheque',
      linea_solicitada:'',
      moneda_solicitada:'Sol',
      documento_valorado_propuesto:'Cheque',
      tipo_linea:'regular',
      vigencia:'20/01/2021 - 15/05/2022',
      plan_control:'',
    },
    {
      id:2,
      sociedad:'2020',
      plan:'Fuera de plan',
      razon_social:'XYZ SA',
      grupo_cliente:'KAM',
      linea_credito_actual:'s/.20000',
      documento_valorado_actual:'Cheque',
      linea_solicitada:'',
      moneda_solicitada:'Sol',
      documento_valorado_propuesto:'Cheque',
      tipo_linea:'regular',
      vigencia:'20/01/2021 - 15/05/2022',
      plan_control:'',
    },
  ];
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
    'id',

  ]
  constructor() { }

  ngOnInit(): void {

  }
  editarPlan() {
    console.log("editarPlan");
  }

}
