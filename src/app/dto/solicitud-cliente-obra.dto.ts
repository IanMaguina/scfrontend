import { FormControl, FormGroup } from "@angular/forms";

export class SolicitudClienteObraDTO {
    id?: number;
    obra_codigo_isicom:string;
    id_solicitud?: number;
    nombre_obra?:string;
    dueno?:string;
    ubicacion?:string;
    plazo_obra?:string;
    informacion_adicional?:string;
    fecha_inicio_obra?:string;
    fecha_fin_obra?:string;
    fecha_inicio_atencion?:string;
    fecha_fin_atencion?:string;
  
    static asFormGroup(grupo: SolicitudClienteObraDTO): FormGroup {
      return new FormGroup({
        id: new FormControl(grupo.id),
        obra_codigo_isicom: new FormControl(grupo.obra_codigo_isicom),
        id_solicitud: new FormControl(grupo.id_solicitud),
        nombre_obra: new FormControl(grupo.nombre_obra),
        dueno: new FormControl(grupo.dueno),
        ubicacion: new FormControl(grupo.ubicacion),
        plazo_obra: new FormControl(grupo.plazo_obra),
        informacion_adicional: new FormControl(grupo.informacion_adicional),
        fecha_inicio_obra: new FormControl(grupo.fecha_inicio_obra),
        fecha_fin_obra: new FormControl(grupo.fecha_fin_obra),
        fecha_inicio_atencion: new FormControl(grupo.fecha_inicio_atencion),
        fecha_fin_atencion: new FormControl(grupo.fecha_fin_atencion),
      });
    }
  }
  