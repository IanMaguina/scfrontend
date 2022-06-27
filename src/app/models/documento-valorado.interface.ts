import { TipoDocumentoValorado } from "./tipo-documento-valorado.interface"

export interface DocumentoValorado{
    id?: number;
    nombre: string;
    activo?: boolean;
    id_tipo_documento_valorado?:number;
    tipo_documento_valorado?:TipoDocumentoValorado;
}