export interface ResumenRiesgoConsolidado {
    nombre_grupo_sociedad?: string;
    sociedad_codigo_sap?: string;
    nombre_sociedad_codigo_sap?: string;
    detalle?: DetalleRiesgoConsolidado[];
}


export interface DetalleRiesgoConsolidado {
    estilo?: string;
    con_garantia: string;
    nombre_tipo_documento_valorado: string;
    nombre_linea_credito: string;
    linea_credito_actual_soles: number;
    linea_credito_solicitada_soles: number;
}





