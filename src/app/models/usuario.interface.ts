import { Perfil } from "./perfil.interface";

export interface Usuario{
    id: number,
    nombre:string,
    email: string,
    profile: Perfil,
}

