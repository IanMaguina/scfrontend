import { CondicionPago } from "./condicion_pago.interface";

export interface CondicionPagoCliente{
    id?: number,
    sociedad_codigo_sap?:string,
    condicion_pago?:CondicionPago,
    grupo_cliente_codigo_sap?:string,
    cliente_codigo_sap?:string,
    linea_producto_codigo_sap?:string, 
    id_solicitud?: number,
    id_estado?:string,
    observacion?:string

}