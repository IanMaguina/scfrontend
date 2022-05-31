import { FormControl, FormGroup } from "@angular/forms";

export class SolicitudPlanDocumentoValoradoDTO {
    id?: number;
    id_solicitud_plan?: number;
    nombre?:string;
    id_tipo_documento_valorado?:number;
    importe?:number;
    porcentaje?:number;
    
  
    static asFormGroup(modeloDTO: SolicitudPlanDocumentoValoradoDTO): FormGroup {
      return new FormGroup({
        id: new FormControl(modeloDTO.id),
        id_solicitud_plan: new FormControl(modeloDTO.id_solicitud_plan),
        nombre: new FormControl(modeloDTO.nombre),
        id_tipo_documento_valorado: new FormControl(modeloDTO.id_tipo_documento_valorado),
        importe: new FormControl(modeloDTO.importe),
        porcentaje: new FormControl(modeloDTO.porcentaje)
      
    })
  }

}
  