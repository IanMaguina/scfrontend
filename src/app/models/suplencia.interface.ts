import { Usuario } from './usuario.interface';
export interface Suplencia{
    id?: number,
    id_usuario: number,
    id_usuario_suplente: number,
    fecha_inicio?:Date,
    fecha_fin?:Date,
    activo?:boolean,
    usuario?:Usuario,
    usuario_suplente?:Usuario
}