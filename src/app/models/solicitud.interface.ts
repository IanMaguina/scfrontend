import { TipoCliente } from './tipo-cliente.interface';
import { Empresa } from './empresa.interface';
export interface Solicitud{
    id?: number,
    id_tipo_documento_identidad?:number,
    numero_documento:string,
    id_tipo_cliente?:number,
    tipo_cliente?:TipoCliente[],
    empresa?:Empresa[],
    flag_existe_solicitud?:boolean
}