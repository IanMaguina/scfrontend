import { Perfil } from "./perfil.interface";
import { Sociedad } from "./sociedad.interface";

export interface Usuario{
    id: number,
    nombre:string,
    correo: string,
    id_perfil:number,
    sociedad_codigo_sap:string,
    perfil: Perfil,
    sociedad:Sociedad,
    activo:boolean
}

