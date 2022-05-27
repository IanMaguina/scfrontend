import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { GrupoCliente } from './grupo-cliente.interface';
export interface SolicitudPlan{
    id?: number,
    id_solicitud?: number,
    id_tipo_linea?: number,
    id_plan?: number,
    grupo_cliente_codigo_sap?: string,
    grupo_cliente?:GrupoCliente,
    id_cliente_agrupacion?: number,
    cliente_agrupacion?:ClienteAgrupacion,
    id_empresa?: number,
    fecha_vigencia?: Date,
    id_tipo_moneda?: number,
    importe?: number,
    fecha_inicio?: Date,
    fecha_fin?: Date,
    comentario?: string,
    id_plan_referencia?: number,
    tipo_calculo?: string  
}