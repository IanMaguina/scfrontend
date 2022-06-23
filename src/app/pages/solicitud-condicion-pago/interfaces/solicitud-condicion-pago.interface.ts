export interface CondicionPago {
    id:                        number;
    sociedad_codigo_sap:       string;
    grupo_cliente_codigo_sap:  string;
    linea_producto_codigo_sap: string;
    valor:                     string;
    sociedad:                  Sociedad;
    grupo_cliente:             GrupoCliente;
    linea_producto:            LineaProducto;
}

export interface GrupoCliente {
    codigo_sap:    string;
    nombre:        string;
    tipo:          string;
    id_tipo_canal: number;
}

export interface LineaProducto {
    codigo_sap: string;
    nombre:     string;
}

export interface Sociedad {
    codigo_sap: string;
    nombre:     string;
    activo:     boolean;
}

