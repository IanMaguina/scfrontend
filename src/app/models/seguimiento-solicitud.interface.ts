import { Estado } from "./estado.interface";
import { Rol } from "./rol.interface";
import { Solicitud } from "./solicitud.interface";
import { Usuario } from "./usuario.interface";

export interface SeguimientoSolicitud {
    id: number;
    id_solicitud: number,
    solicitud: Solicitud;
    id_usuario: number;
    usuario: Usuario;
    id_rol: number,
    rol: Rol;
    id_estado: number;
    estado: Estado;
    fecha_inicio: string;
    fecha_fin: string;
    tiempo_minutos: string;
    esta_aqui: boolean;

}

