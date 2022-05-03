import { TipoCliente } from './tipo-cliente.interface';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Empresa } from './empresa.interface';
import { Usuario } from './usuario.interface';
import { Estado } from './estado.interface';
import { GrupoCliente } from './grupo-cliente.interface';
export interface SolicitudCliente{
    id?: number,
    id_solicitud?:number,
    id_cliente_agrupacion?: number,
    nombre_cliente_agrupacion?: string,
    id_documento_identidad_cliente_agrupacion?: number,
    numero_documento_cliente_agrupacion?:string,
    cliente_codigo_sap?:string,
    cliente_codigo_isicom?:string,
    id_empresa?: number,
    id_documento_identidad?: number,
    numero_documento?:string,
    razon_social?:string,
    grupo_cliente_codigo_sap?:string,
    zonal_codigo_sap?:string,
    sociedad_codigo_sap?:string,
    correo?:string,
    telefono?:string,
    sustento_comercial?:string,
    cliente_agrupacion?:ClienteAgrupacion,
    empresa?:Empresa,
    grupo_cliente?:GrupoCliente
}