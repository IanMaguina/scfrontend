export interface RiesgoClienteRepresentanteLegal{
id?:number;
sociedad_codigo_sap?:string;
id_empresa?:string;
id_tipo_documento?:number;
numero_documento?:string;
nombre?:string;
semaforo_actual?:string;
calificacion_normal?:string;
peor_calificacion?:string;
deuda_total?:string;
deuda_vencida?:string;
activo?:boolean;
adjunto?:string;
id_trpa_reporte_riesgo_cliente?: string;
fecha_sistema?:string;
}