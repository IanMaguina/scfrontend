import { PagesComponent } from './../pages.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SolicitudCreditoComponent } from './solicitud-credito.component';
import { CrearSolicitudCreditoComponent } from './solicitud-credito/crear-solicitud-credito/crear-solicitud-credito.component';
import { GrupoEmpresarialComponent } from '../configuracion/grupo/grupo-empresarial/grupo-empresarial.component';
import { ConsorcioComponent } from '../configuracion/consorcio/consorcio/consorcio.component';
import { BandejaSolicitudCreditoComponent } from './solicitud-credito/bandeja-solicitud-credito/bandeja-solicitud-credito.component';
import { BandejaSolicitudConsorcioComponent } from './solicitud-credito/bandeja-solicitud-consorcio/bandeja-solicitud-consorcio.component';
import { BandejaSolicitudGrupoComponent } from './solicitud-credito/bandeja-solicitud-grupo/bandeja-solicitud-grupo.component';

const routes: Routes = [
  {
    path: 'app/solicitudcredito',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'nuevasolicitudcredito', pathMatch: 'full' },
      { path: 'nuevasolicitudcredito', component: CrearSolicitudCreditoComponent, data: { titulo: 'Nueva Solicitud de Crédito', ruta: 'Solicitud de Crédito  /  Nueva' } },
      { path: 'crearSolicitudGrupo', component: GrupoEmpresarialComponent, data: { titulo: 'Solicitud de Grupo', ruta: 'Solicitud de Crédito  /  Solicitud de Grupo' } },
      { path: 'crearSolicitudConsorcio', component: ConsorcioComponent, data: { titulo: 'Solicitud de Consorcio', ruta: 'Solicitud de Crédito  /  Solicitud de Consorcio' } },
      { path: 'bandejaMisPendiendes', component: BandejaSolicitudCreditoComponent, data: { titulo: 'Bandeja de Pendientes', ruta: 'Solicitud de Crédito  /  Bandeja de Pendientes' } },
      { path: 'bandejaGruposPendiendes', component: BandejaSolicitudGrupoComponent, data: { titulo: 'Bandeja de Grupos Pendientes', ruta: 'Solicitud de Crédito  /  Bandeja de Grupos Pendientes' } },
      { path: 'bandejaConsorciosPendiendes', component: BandejaSolicitudConsorcioComponent, data: { titulo: 'Bandeja de Consorcios Pendientes', ruta: 'Solicitud de Crédito  /  Bandeja de Consorcios Pendientes' } },

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [
    RouterModule,
  ]
})
export class SolicitudCreditoRoutingModule { }