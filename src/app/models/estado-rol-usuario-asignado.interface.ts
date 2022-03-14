import { EstadoRol } from "./estado-rol.interface";
import { Usuario } from "./usuario.interface";
export interface EstadoRolUsuarioAsignado{
    id?: number,
    id_estado_rol_usuario?:number,
    id_estado_rol_asignado?:number,
    id_usuario_asignado?:number,
    estadoRolUsuario?:EstadoRol,
    estadoRolAsignado?:EstadoRol,
    usuario?:Usuario,
    usuarioAsignado?:Usuario,
    activo?:boolean
}

