import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { EstadoRol } from "./estado-rol.interface";
import { Usuario } from "./usuario.interface";
export interface EstadoRolUsuarioAsignado{
    id?: number,
    id_estado_rol_usuario?:number,
    id_estado_rol_asignado?:number,
    id_usuario_asignado?:number,
    sociedad_codigo_sap:string,
    id_grupo_cliente:number,
    estadoRolUsuario?:EstadoRol,
    estadoRolAsignado?:EstadoRol,
    grupo_cliente?:GrupoCliente,
    usuario?:Usuario,
    usuarioAsignado?:Usuario,
    activo?:boolean
}

