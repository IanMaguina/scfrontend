import { EstadoRol } from "./estado-rol.interface";
import { Usuario } from "./usuario.interface";
export interface EstadoRolUsuario{
    id?: number,
    estadoRol:EstadoRol,
    usuario:Usuario,
    activo:boolean
}

