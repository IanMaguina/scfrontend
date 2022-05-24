export interface RiesgoCliente{
id_solicitud?:number;
cliente_codigo_sap?:string;
sociedad_codigo_sap?:string;
id_tipo_documento?:number;
numero_documento?:string;
razon_social?:string;
semaforo_actual?:string;
deuda_total?:string;
reactiva?:string;
peor_calificacion?:string;
calificacion_normal?:string;
deuda_vencida?:string;
otros_reportes_negativos?:string;
impagos?: string;
protestos?:string;
deuda_laboral?:string;
deuda_tributaria?:string;
fecha_consulta?:string;
activo?:boolean;
estado_rpa?:string;
fecha_sistema?:string;
}