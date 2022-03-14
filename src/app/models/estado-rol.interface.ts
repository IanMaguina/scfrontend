import { Estado } from "./estado.interface";
import { Rol } from "./rol.interface";
export interface EstadoRol{
    id?: number,
    nombre:string,
    id_estado?:number,
    estado?:Estado,
    rol?:Rol

}

