import { Usuario } from "./usuario.interface";

export interface AprobadorAdicional{
    id?:number;
    usuario:Usuario;
    activo?:boolean;
}