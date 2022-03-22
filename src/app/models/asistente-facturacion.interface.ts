import { Usuario } from "./usuario.interface";
import { Zonal } from "./zonal.interface";

export interface AsistenteFacturacion{
    id?: number,
    usuario:Usuario,
    zonal:Zonal,
    activo?:boolean
}

