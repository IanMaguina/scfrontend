import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { NuevaSolicitudLcComponent } from './lineacredito/nueva-solicitud-lc/nueva-solicitud-lc.component';
import { NuevaSolicitudTrasladoComponent } from './traslado/nueva-solicitud-traslado/nueva-solicitud-traslado.component';
import { NuevaSolicitudRmComponent } from './revisionmensual/nueva-solicitud-rm/nueva-solicitud-rm.component';
import { NuevaSolicitudSgComponent } from './sobregiros/nueva-solicitud-sg/nueva-solicitud-sg.component';
import { NuevaSolicitudDvDeudoresComponent } from './documentosvalorados/nueva-solicitud-dv-deudores/nueva-solicitud-dv-deudores.component';
import { NuevaSolicitudDvAcreedoresComponent } from './documentosvalorados/nueva-solicitud-dv-acreedores/nueva-solicitud-dv-acreedores.component';
import { ReporteLineaCreditoComponent } from './reportes/reporte-linea-credito/reporte-linea-credito.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,

    
    
    NuevaSolicitudRmComponent,
    NuevaSolicitudSgComponent,
    NuevaSolicitudDvDeudoresComponent,
    NuevaSolicitudDvAcreedoresComponent,
    ReporteLineaCreditoComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule,
    ConfiguracionModule,
   ],
})
export class PagesModule { }
