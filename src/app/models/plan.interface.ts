import { NivelMora } from './nivel-mora.interface';
import { TipoMoneda } from './tipo-moneda.interface';
import { LineaProducto } from './linea-producto.interface';
import { GrupoCliente } from './grupo-cliente.interface';
import { TipoPlanCredito } from './tipo-plan-credito.interface';
import { CentroRiesgo } from './centro-riesgo.interface';
import { TipoDocumentoValorado } from './tipo-documento-valorado.interface';
export interface Plan{
    id?: number,
    id_tipo_plan_credito?:number,
    carta_fianza:string,
    id_tipo_moneda?:number,
    bolsa?:number,
    camiones?:number,
    revision_mensual?:string,
    activo?:boolean,
    tipo_plancredito?:TipoPlanCredito,
    tipo_plan_credito?:TipoPlanCredito,
    grupo_cliente?:GrupoCliente[],
    documento_valorado?:TipoDocumentoValorado[],
    linea_producto?:LineaProducto[],
    lista_cliente?:GrupoCliente[],
    tipo_moneda?:TipoMoneda,
    nivel_mora?:NivelMora[],
    centro_riesgo?:CentroRiesgo[]
}