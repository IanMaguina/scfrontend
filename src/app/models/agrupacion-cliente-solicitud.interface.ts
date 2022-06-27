import { Empresa } from "./empresa.interface";
import { Estado } from "./estado.interface";
import { GrupoCliente } from "./grupo-cliente.interface";
import { Sociedad } from "./sociedad.interface";
import { TipoCanal } from "./tipo-canal.interface";
import { TipoCliente } from "./tipo-cliente.interface"
import { Usuario } from "./usuario.interface";

export interface AgrupacionClienteSolicitud {
    id?: number;
    id_tipo_cliente?: number;
    tipo_cliente?: TipoCliente;
    id_tipo_documento_identidad?: number;
    numero_documento?: string;
    nombre?: string;
    activo?: boolean;
    empresa?: Empresa[];
    id_estado_cliente_agrupacion?: number;
    estado_cliente_agrupacion?: Estado;
    id_usuario_creacion?: string;
    usuario_creacion?: Usuario;
    id_usuario_modificacion?: string;
    cliente_codigo_isicom?: string;
    cliente_codigo_sap?: string;
    grupo_cliente_codigo_sap?: string;
    grupo_cliente?: GrupoCliente;
    id_tipo_canal?: number;
    tipo_canal?: TipoCanal;
    sociedad_codigo_sap?: string;
    sociedad?: Sociedad;
    fecha_creacion?: string;
    fecha_modificacion?: string;








}
