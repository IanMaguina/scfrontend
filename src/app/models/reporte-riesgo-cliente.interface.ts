import { RiesgoClienteRepresentanteLegal } from "./riesgo-cliente-representante-legal.interface";
import { RiesgoCliente } from "./riesgo-cliente.interface";

export interface ReporteRiesgoCliente{
    reporte_riesgo_cliente?:RiesgoCliente[];
    reporte_riesgo_cliente_representante_legal?:RiesgoClienteRepresentanteLegal[];

}