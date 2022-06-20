import { Plan } from "./plan.interface";

export interface CesionDerechosProveedores{
id?:number;
sociedad_codigo_sap?:number;
plan?:Plan;
razon_social?:string;
grupo_cliente?:string;
linea_credito_actual?:string;
moneda_actual?:string;
vigencia?:string;
documento_valorado_actual?:string;

}   