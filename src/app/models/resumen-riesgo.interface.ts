export interface ResumenRiesgo {
    id?: number;
    sociedad_codigo_sap?: number;
    numero_documento_valorado?: string;
    total_categoria?: string;
    categoria?: Categoria;
    linea_credito_actual?: string;
    linea_credito_actual_convertida?: string;
    
    linea_credito_solicitada?: string;
    
    linea_credito_solicitada_convertida?: string;
    variacion?: string;
}


export interface Categoria {
    id: number;
    nombre: string;
    linea_credito_actual?: string;
    linea_credito_actual_convertida?: string;
    moneda_actual?: string;
    linea_credito_solicitada?: string;
    moneda_solicitada?: string;
    linea_credito_solicitada_convertida?: string;
}