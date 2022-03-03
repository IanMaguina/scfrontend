import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaSolicitudDvDeudoresComponent } from './nueva-solicitud-dv-deudores/nueva-solicitud-dv-deudores.component';
import { NuevaSolicitudDvAcreedoresComponent } from './nueva-solicitud-dv-acreedores/nueva-solicitud-dv-acreedores.component';



@NgModule({
  declarations: [
    NuevaSolicitudDvDeudoresComponent,
    NuevaSolicitudDvAcreedoresComponent,
  ],
  exports: [
    NuevaSolicitudDvDeudoresComponent,
    NuevaSolicitudDvAcreedoresComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class DocumentosvaloradosModule { }
