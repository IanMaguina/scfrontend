import { Usuario } from "./usuario.interface";
import { Zonal } from "./zonal.interface";

export interface AsistenteFacturacion{
    id?: number,
    id_usuario?:number,
    usuario?:Usuario,
    zonal_codigo_sap?:string,
    zonal?:Zonal,
    activo?:boolean
}

