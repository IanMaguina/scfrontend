import { TipoFlujoAprobacion } from './tipo-flujo-aprobacion.interface';
export interface TipoPlanCredito{
    id?: number,
    nombre: string,
    id_tipo_flujo_aprobacion?:number,
    tipoFlujoAprobacion?:TipoFlujoAprobacion
}