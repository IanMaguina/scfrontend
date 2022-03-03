import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteLineaCreditoComponent } from './reporte-linea-credito/reporte-linea-credito.component';



@NgModule({
  declarations: [
    ReporteLineaCreditoComponent,
  ],
  exports: [
    ReporteLineaCreditoComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ReportesModule { }
