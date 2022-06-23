export interface ClientSap {
    id_solicitud:         string;
    modo_ejecucion:       string;
    solicitud_codigo_sap: string;
    codigo_status:        string;
    tipo_mensaje:         string;
    mensaje:              string;
    clientes:             Cliente[];
}

export interface client{
    sociedad: string;
    codigo_sap: string;
    ruc:string;
    razon_social:string;
    grupo_cliente:string;
    canal_comercial:string;
    zonal:string;
}

export interface Cliente {
    sociedad_codigo_sap:      string;
    cliente_codigo_sap:       string;
    numero_documento:         string;
    razon_social:             string;
    zonal_codigo_sap:         string;
    nombre_zonal:             string;
    nombre_sociedad:          string;
    grupo_cliente_codigo_sap: string;
    nombre_grupo_cliente:     string;
}
