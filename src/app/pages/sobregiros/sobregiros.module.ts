import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaSolicitudSgComponent } from './nueva-solicitud-sg/nueva-solicitud-sg.component';



@NgModule({
  declarations: [
    NuevaSolicitudSgComponent
  ],
  exports: [
    NuevaSolicitudSgComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SobregirosModule { }
