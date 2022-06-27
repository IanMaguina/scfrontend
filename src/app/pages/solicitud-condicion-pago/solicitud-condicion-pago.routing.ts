import { PagesComponent } from './../pages.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CrearSolicitudCondicionPagoComponent } from './pages/crear-solicitud-condicion-pago/crear-solicitud-condicion-pago.component';
import { BandejaSolicitudCondicionPagoComponent } from './pages/bandeja-solicitud-condicion-pago/bandeja-solicitud-condicion-pago.component';


const routes: Routes = [
  {
    path: 'app/solicitudcondicionpago',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'nuevasolicitudcondicionpago', pathMatch: 'full' },
      { path: 'nuevasolicitudcondicionpago', component: CrearSolicitudCondicionPagoComponent, data: { titulo: 'Solicitud de Condicion de Pago', ruta: 'Solicitud de Condición de Pago  /  Nueva', acceso: 'solicitante' } },
      { path: 'bandejacondicionpago', component: BandejaSolicitudCondicionPagoComponent, data: { titulo: 'Solicitud de Condicion de pago', ruta: 'Solicitud de Condición de Pago  ', acceso: 'solicitante' } }
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
export class SolicitudCondicionPagoRoutingModule { }
