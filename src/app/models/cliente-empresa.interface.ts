import { TipoCliente } from "./tipo-cliente.interface";
import { ClienteAgrupacion } from "./cliente-agrupacion.interface";


export interface ClienteEmpresa{
    id?: number,
    id_tipo_cliente?:number,
    tipo_cliente?:TipoCliente,
    id_tipo_documento_identidad?:number,
    tipo_documento_identidad?:TipoDocumentoIdentidad,
    numero_documento?:string,
    nombre:string,
    activo?:boolean
}

