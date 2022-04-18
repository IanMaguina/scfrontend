
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SolicitudCreditoComponent } from './solicitud-credito.component';
import { CrearSolicitudCreditoComponent } from './solicitud-credito/crear-solicitud-credito/crear-solicitud-credito.component';

const routes: Routes = [
  {
    path: 'solicitudcredito',
    component: SolicitudCreditoComponent,
    children: [
      { path: '', redirectTo: 'nuevasolicitudcredito', pathMatch: 'full' },
      { path: 'nuevasolicitudcredito', component: CrearSolicitudCreditoComponent, data: { titulo: 'Nueva Solicitud de Crédito', ruta: 'Solicitud de Crédito  /  Nueva' } },

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

  ],
  exports: [
    RouterModule,
  ]
})
export class SolicitudCreditoRoutingModule { }