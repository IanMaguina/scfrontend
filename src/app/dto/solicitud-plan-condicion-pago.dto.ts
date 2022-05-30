import { FormControl, FormGroup } from "@angular/forms";

export class SolicitudPlanCondicionPagoDTO {
    id?: number;
    id_solicitud_plan?: number;
    codigo_sap?:string;
    nombre?:string;
    id_condicion_pago_linea_producto?:number;
    valor?:number;
    valor_nuevo?:number;
    fecha_vigencia?:Date;
    linea_producto?:string;
    
  
    static asFormGroup(modeloDTO: SolicitudPlanCondicionPagoDTO): FormGroup {
      return new FormGroup({
        id: new FormControl(modeloDTO.id),
        id_solicitud_plan: new FormControl(modeloDTO.id_solicitud_plan),
        codigo_sap: new FormControl(modeloDTO.codigo_sap),
        nombre: new FormControl(modeloDTO.nombre),
        id_condicion_pago_linea_producto: new FormControl(modeloDTO.id_condicion_pago_linea_producto),
        valor: new FormControl(modeloDTO.valor),
        valor_nuevo: new FormControl(modeloDTO.valor_nuevo),
        fecha_vigencia: new FormControl(modeloDTO.fecha_vigencia),
        linea_producto: new FormControl(modeloDTO.linea_producto),
      });
    }
  }
  