export interface ResumenRiesgo {
    sociedad_codigo_sap?: string;
    nombre_sociedad_codigo_sap?: string;
    detalle?: DetalleResumenRiesgo[];

}

export interface DetalleResumenRiesgo {

    nombre_grupo_sociedad?: string;
    id_tipo_documento_valorado?: 1;
    nombre_tipo_documento_valorado?: string;
    nombre_linea_credito?: string;
    linea_credito_actual?: string;
    moneda_actual?: string;
    linea_credito_actual_soles?: string;
    linea_credito_solicitada?: string;
    id_tipo_moneda?: number;
    moneda_solicitada?: string;
    linea_credito_solicitada_soles?: string;
    estilo?: string;

}



