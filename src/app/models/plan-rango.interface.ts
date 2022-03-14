import { TipoPlanCredito } from './tipo-plan-credito.interface';
export interface PlanRango{
    id?: number,
    id_tipo_plancredito?:number,
    desde:string,
    hasta:string,
    valor_inicial:number,
    valor_final:number,
    tipoPlanCredito?:TipoPlanCredito
}