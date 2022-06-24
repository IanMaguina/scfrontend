export interface ResumenRiesgo {
    id?: number;
    tipo_linea?: string;
    numero_documento_valorado?: string;
    is_total?: boolean;
    total_header_nombre?: string;
    elemento?:Elemento[];
    linea_credito_actual?: string;
    linea_credito_actual_convertida?: string;
    linea_credito_solicitada?: string;
    linea_credito_solicitada_convertida?: string;
    variacion?: string;
    linea_credito_solicitada_convertida_dino?: string;
    linea_credito_solicitada_convertida_disac?: string;
}


export interface Elemento {
    id?: number;
    nombre?: string;
    linea_credito_actual?: string;
    linea_credito_actual_convertida?: string;
    moneda_actual?: string;
    variacion?: string;
    linea_credito_solicitada?: string;
    moneda_solicitada?: string;
    linea_credito_solicitada_convertida?: string;
    linea_credito_solicitada_convertida_dino?: string;
    linea_credito_solicitada_convertida_disac?: string;
}