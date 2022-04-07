import { EstadoRol } from "./estado-rol.interface";
import { Sociedad } from "./sociedad.interface";
import { Usuario } from "./usuario.interface";
export interface Estrategia{
    id?: number,
    sociedad?:Sociedad,
    id_estado_rol?:number,
    estado_rol?:EstadoRol,
    usuario?:Usuario,
    id_usuario?:number,
    revisor?:Usuario,
    id_usuario_revisor?:number,
}

