import { TipoCanal } from "./tipo-canal.interface";
import { GrupoCliente } from "./grupo-cliente.interface";
import { Zonal } from "./zonal.interface";
import { Sociedad } from "./sociedad.interface";
export interface Empresa{
    id?: number,
    razon_social:string,
    alias_razon_social:string,
    codigo_cliente_sap:string,
    id_tipo_canal?:number,
    id_grupo_cliente?:number,
    id_zonal?:number,
    id_tipo_documento_identidad?:number,
    numero_documento:string,
    tipo_canal:TipoCanal,
    grupo_cliente:GrupoCliente,
    zonal:Zonal
    sociedad:Sociedad
}

