import { Empresa } from "./empresa.interface";

export interface AsociadoNoSobregiro{
    id?:number;
    id_empresa?:number;
    codigo_cliente_sap?:string;
    numero_documento?:string;
    nombre_sociedad?:string;
    razon_social?:string;
    empresa?:Empresa;
}