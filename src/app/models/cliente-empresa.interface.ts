import { ClienteAgrupacion } from "./cliente-agrupacion.interface";
import {  Empresa } from "./empresa.interface";

export interface ClienteEmpresa{
    id?: number,
    id_cliente_agrupacion?:number,
    id_empresa?:number,
    empresa?:Empresa,
    cliente_agrupacion?:ClienteAgrupacion,
    id_usuario_creacion?:number,
    activo?:boolean
}

