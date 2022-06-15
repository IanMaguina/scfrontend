import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Empresa } from './empresa.interface';
import { GrupoCliente } from './grupo-cliente.interface';
import { Plan } from './plan.interface';
import { Solicitud } from './solicitud.interface';
import { TipoLinea } from './tipo-linea.interface';
import { TipoMoneda } from './tipo-moneda.interface';
export interface SolicitudPlan{
    id?: number,
    importe?: number,
    fecha_vigencia?: Date,
    documento_valorado_propuesto?:string,
    solicitud?: Solicitud,
    plan?: Plan,
    empresa?: Empresa,
    grupo_cliente?:GrupoCliente,
    tipo_moneda?: TipoMoneda,
    id_solicitud?: number,
    id_tipo_linea?: number,
    tipo_linea?:TipoLinea,
    id_plan?: number,
    grupo_cliente_codigo_sap?: string,
    id_cliente_agrupacion?: number,
    cliente_agrupacion?:ClienteAgrupacion,
    id_empresa?: number,
    id_tipo_moneda?: number,
    fecha_inicio?: Date,
    fecha_fin?: Date,
    comentario?: string,
    id_plan_referencia?: number,
    tipo_calculo?: string,
}

