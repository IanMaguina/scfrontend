import { ClienteAgrupacion } from "./cliente-agrupacion.interface";
import { SolicitudCliente } from "./solicitud-cliente.interface";

export interface ClienteDatos{
    id?: number,
    id_tipo_cliente?:number,
    id_cliente_agrupacion?:number,
    id_tipo_documento_identidad?:number,
    numero_documento?:string,
    nombre?:string,
    solicitud_cliente?:SolicitudCliente[],
    cliente_agrupacion?:ClienteAgrupacion,
    activo?:boolean
}

