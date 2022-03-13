import { Estado } from "./estado.interface";
import { Rol } from "./rol.interface";
export interface EstadoRol{
    id?: number,
    nombre:string,
    estado?:Estado,
    rol?:Rol

}

