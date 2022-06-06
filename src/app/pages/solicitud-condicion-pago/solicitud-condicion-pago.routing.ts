import { PagesComponent } from './../pages.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CrearSolicitudCondicionPagoComponent } from './crear-solicitud-condicion-pago/crear-solicitud-condicion-pago.component';


const routes: Routes = [
  {
    path: 'app/solicitudcondicionpago',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'nuevasolicitudcondicionpago', pathMatch: 'full' },
      { path: 'nuevasolicitudcondicionpago', component: CrearSolicitudCondicionPagoComponent, data: { titulo: 'Solicitud de Grupo', ruta: 'Solicitud de Condición de Pago  /  Nueva', acceso:'solicitante' } },
     
  
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
