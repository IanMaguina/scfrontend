import { Sociedad } from 'src/app/models/sociedad.interface';
import { TipoCanal } from './tipo-canal.interface';
import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { FormControl, FormGroup, Validators } from "@angular/forms";

export class SolicitudClienteDTO {
    sociedad?:Sociedad;
    sociedad_codigo_sap?: string;
    numero_documento?:string;
    razon_social?:string;
    cliente_codigo_sap?:string;
    tipo_canal?:TipoCanal;
    grupo_cliente?:GrupoCliente;
    sustento_comercial?:string;
    id?:number;
    zonal_codigo_sap?:string;
    correo?:string;
    telefono?:string;
  
    static asFormGroup(grupo: SolicitudClienteDTO): FormGroup {
      return new FormGroup({
        sociedad: new FormControl(grupo.sociedad),
        sociedad_codigo_sap: new FormControl(grupo.sociedad_codigo_sap),
        numero_documento: new FormControl(grupo.numero_documento),
        razon_social: new FormControl(grupo.razon_social),
        cliente_codigo_sap: new FormControl(grupo.cliente_codigo_sap),
        tipo_canal: new FormControl(grupo.tipo_canal),
        grupo_cliente: new FormControl(grupo.grupo_cliente),
        sustento_comercial: new FormControl(grupo.sustento_comercial),
        id: new FormControl(grupo.id),
        zonal_codigo_sap: new FormControl(grupo.zonal_codigo_sap),
        correo: new FormControl(grupo.correo),
        telefono: new FormControl(grupo.telefono),
      });
    }
  }
  