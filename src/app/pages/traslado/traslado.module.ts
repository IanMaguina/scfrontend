import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaSolicitudTrasladoComponent } from './nueva-solicitud-traslado/nueva-solicitud-traslado.component';



@NgModule({
  declarations: [
    NuevaSolicitudTrasladoComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NuevaSolicitudTrasladoComponent,
  ],
})
export class TrasladoModule { }
