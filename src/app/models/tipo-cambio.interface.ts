import { TipoMoneda } from "./tipo-moneda.interface";
import { Usuario } from "./usuario.interface";

export interface TipoCambio {
    id?:number;
    id_usuario?:number;
    usuario?:Usuario;
    fecha?:Usuario;
    valor?:number;
    activo?:boolean;
    id_tipo_moneda?:number;
    tipo_moneda?:TipoMoneda;
  }