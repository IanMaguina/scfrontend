import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { SolicitudCreditoModule } from './solicitud-credito/solicitud-credito.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent

  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatSidenavModule,
    
    ConfiguracionModule,
    SolicitudCreditoModule,
  ],
})
export class PagesModule { }
