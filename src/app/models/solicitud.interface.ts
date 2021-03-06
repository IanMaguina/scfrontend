import { TipoCliente } from './tipo-cliente.interface';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Empresa } from './empresa.interface';
import { Usuario } from './usuario.interface';
import { Estado } from './estado.interface';
export interface Solicitud{
    id?: number,
    ya_tiene_solicitud?:boolean,
    correlativo?: string,
    id_estado?: number,
    id_rol?: number,
    id_usuario?: number,
    id_usuario_creacion?:number,
    id_solicitud_referencia?: number,
    sociedad_codigo_sap?: string,
    id_cliente_agrupacion?: number,
    id_empresa?: number,
    cliente_agrupacion?:ClienteAgrupacion,
    empresa?:Empresa,
    id_tipo_cliente?:number,
    tipo_cliente?:TipoCliente

    usuario?:Usuario,
    estado?:Estado,
    razon_social?:string,
    numero_documento?:string,
    fecha_creacion?:string,

    crear_correlativo?:boolean
}