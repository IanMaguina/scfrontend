import { Empresa } from './empresa.interface';
import { TipoCliente } from "./tipo-cliente.interface";
import { TipoDocumentoIdentidad } from "./tipo-documento-identidad.interface";

export interface ClienteAgrupacion{
    id?: number,
    id_tipo_cliente?:number,
    tipo_cliente?:TipoCliente,
    id_usuario_creacion?:number,
    id_tipo_documento_identidad?:number,
    tipo_documento_identidad?:TipoDocumentoIdentidad,
    numero_documento?:string,
    nombre:string,
    empresa?:Empresa[];
    activo?:boolean
}

