import { ClienteAgrupacion } from "./cliente-agrupacion.interface";
import { Empresa } from "./empresa.interface";

export interface ClienteAgrupacionEmpresa {
    id?: number;
    id_cliente_agrupacion?: number;
    cliente_agrupacion?: ClienteAgrupacion;
    id_empresa?: number;
    empresa?: Empresa;
    activo?: boolean;
    participacion?: string;
    id_estado_cliente_agrupacion?: number;
    id_usuario_creacion?: number;
    id_usuario_modificacion?: number;
    fecha_creacion?: string;
    fecha_modificacion?: string;
}



