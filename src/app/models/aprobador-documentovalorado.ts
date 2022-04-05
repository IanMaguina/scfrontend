import { Usuario } from "./usuario.interface";
export interface AprobadorDocumentovalorado{
    id?: number,
    id_plan_documentovalorado?:number,
    id_tipo_plancredito?:number,
    id_tipo_aprobador?:number,
    id_usuario?:number,
    orden?:number,
    usuario?:Usuario;
    activo?:boolean;
}