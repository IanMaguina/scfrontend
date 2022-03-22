import { TipoPlanCredito } from './tipo-plan-credito.interface';
export interface Plan{
    id?: number,
    id_tipo_plan_credito?:number,
    carta_fianza:string,
    id_tipo_moneda?:number,
    bolsa?:number,
    camiones?:number,
    revision_mensual?:string,
    activo?:boolean,
    tipoPlanCredito?:TipoPlanCredito
}