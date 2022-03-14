import { EstadoRol } from "./estado-rol.interface";
import { Usuario } from "./usuario.interface";
export interface EstadoRolUsuario{
    id?: number,
    id_estado_rol?:number,
    id_usuario?:number,
    id_usuario_revisor?:number,
    estadoRol?:EstadoRol,
    usuario?:Usuario,
    activo?:boolean
}

