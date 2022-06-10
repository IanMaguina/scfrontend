export interface LineaProducto{
    id?: number,
    nombre:string,
}

export interface lineaCondicionPago{
    id:                        number;
    linea_producto:            LineaProducto;
}

export interface LineaProducto {
    codigo_sap: string;
    nombre:     string;
}




