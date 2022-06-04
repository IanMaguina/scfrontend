import { GrupoCliente } from "./grupo-cliente.interface";
import { Rol } from "./rol.interface";
import { Sociedad } from "./sociedad.interface";
import { Usuario } from "./usuario.interface";

export interface RolUsuario {
    id?: number,
    sociedad_codigo_sap?: string,
    sociedad?: Sociedad,
    grupo_cliente_codigo_sap?: string,
    grupo_cliente?: GrupoCliente,
    id_usuario?: number,
    usuario?: Usuario,
    id_rol?: number,
    rol?: Rol,
    activo?: boolean,
    usuario_revisor?: Usuario,
    id_usuario_revisor?:number,
}

