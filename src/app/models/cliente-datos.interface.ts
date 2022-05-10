import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { TipoCanal } from './tipo-canal.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ClienteAgrupacion } from "./cliente-agrupacion.interface";
import { SolicitudCliente } from "./solicitud-cliente.interface";
import { Empresa } from './empresa.interface';

export interface ClienteDatos{
    id?: number,
    id_tipo_cliente?:number,
    id_cliente_agrupacion?:number,
    id_tipo_documento_identidad?:number,
    numero_documento?:string,
    nombre?:string,
    solicitud_cliente?:SolicitudCliente[],
    cliente_agrupacion?:ClienteAgrupacion,
    razon_social?:string,
    cliente_codigo_sap?:string,
    cliente_codigo_isicom?:string,
    activo?:boolean,
    sociedad?:Sociedad
    tipo_canal?:TipoCanal,
    grupo_cliente?:GrupoCliente,
    empresa?:Empresa,
}

