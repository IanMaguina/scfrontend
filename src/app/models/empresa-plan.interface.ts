import { ClienteAgrupacion } from "./cliente-agrupacion.interface";
import { Empresa } from "./empresa.interface";
import { Solicitud } from "./solicitud.interface";
import { Zonal } from "./zonal.interface";

export interface EmpresaPlan {
    id?: number,
    id_solicitud?: number,
    solicitud?: Solicitud,
    id_cliente_agrupacion?: number,
    cliente_agrupacion?: ClienteAgrupacion,
    id_empresa?: number,
    empresa?: Empresa,
    zonal_codigo_sap?: string,
    zonal?: Zonal,
    correo?: string,
    nombre_cliente_agrupacion?: string,
    id_documento_identidad_cliente_agrupacion?: number,
    numero_documento_cliente_agrupacion?: string,
    id_documento_identidad?: number,
    numero_documento?: string,
    razon_social?: string,
    telefono?: string,
    sustento_comercial?: string,
    participacion?: number
  }