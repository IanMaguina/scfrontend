export interface ReporteMorosidad{
    estado?:string;
    sociedad_codigo_sap?:string;
    numero_documento?:string;
    anexo_sap?:string;
    calificacion?:string;
    promedio_mora_partida_abierta?:string;
    promedio_mora_0_meses?:string;
    promedio_mora_1_meses?:string;
    promedio_mora_3_meses?:string;
    promedio_mora_6_meses?:string;
    promedio_mora_12_meses?:string;
    adjunto?:string;
}