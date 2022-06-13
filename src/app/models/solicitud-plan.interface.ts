import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Empresa } from './empresa.interface';
import { GrupoCliente } from './grupo-cliente.interface';
import { Plan } from './plan.interface';
import { Solicitud } from './solicitud.interface';
import { TipoMoneda } from './tipo-moneda.interface';
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
    tipo_calculo?: string,
    solicitud?: Solicitud,
    plan?: Plan,
    empresa?: Empresa,
    tipo_moneda?: TipoMoneda,
}