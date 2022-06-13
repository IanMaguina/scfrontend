import { DocumentoValorado } from "./documento-valorado.interface";
import { Empresa } from "./empresa.interface";
import { Solicitud } from "./solicitud.interface";
import { TipoMoneda } from "./tipo-moneda.interface";
import { TipoPlanCredito } from "./tipo-plan-credito.interface";

export interface ResponsePlanRiesgo {

    documento_valorado_propuesto?: string[],
    data?: PlanRiesgo[],
}
export interface PlanRiesgo {
    solicitud_plan?: SolicitudPlan,
    documento_valorado?: DocumentoValorado,
}

export interface SolicitudPlan {
    id: number,
    id_solicitud: number,
    id_tipo_linea: number,
    id_plan: number,
    grupo_cliente_codigo_sap: string,
    id_cliente_agrupacion: string,
    id_empresa: number,
    fecha_vigencia: string,
    id_tipo_moneda: number,
    importe: number,
    fecha_inicio: string,
    fecha_fin: string,
    comentario: string,
    id_plan_referencia: string,
    tipo_calculo: string,
    solicitud: Solicitud,
    plan: Plan,
    grupo_cliente: string,
    cliente_agrupacion: string,
    empresa: Empresa,
    tipo_moneda: TipoMoneda,
}

export interface Plan {
    id?: number,
    id_tipo_plan_credito?: number,
    id_tipo_moneda?: number,
    bolsa?: number,
    camiones?: number,
    activo?: boolean,
    carta_fianza?: number,
    revision_mensual?: number,
    tipo_plan_credito?: TipoPlanCredito
}