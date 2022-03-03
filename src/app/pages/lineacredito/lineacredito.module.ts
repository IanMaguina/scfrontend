import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaSolicitudLcComponent } from './nueva-solicitud-lc/nueva-solicitud-lc.component';



@NgModule({
  declarations: [
    NuevaSolicitudLcComponent,
  ],
  exports:[
    NuevaSolicitudLcComponent,
    
  ],
  imports: [
    CommonModule
  ]
})
export class LineacreditoModule { }
