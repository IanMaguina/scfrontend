import { PagesComponent } from './../pages.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CrearSolicitudCreditoComponent } from './solicitud-credito/crear-solicitud-credito/crear-solicitud-credito.component';
import { GrupoEmpresarialComponent } from '../configuracion/grupo/grupo-empresarial/grupo-empresarial.component';
import { ConsorcioComponent } from '../configuracion/consorcio/consorcio/consorcio.component';
import { BandejaSolicitudCreditoComponent } from './solicitud-credito/bandeja-solicitud-credito/bandeja-solicitud-credito.component';
import { EditarSolicitudCreditoComponent } from './solicitud-credito/editar-solicitud-credito/editar-solicitud-credito.component';
import { EvaluarCreditoComponent } from './evaluar-credito/evaluar-credito.component';

const routes: Routes = [
  {
    path: 'app/solicitudcredito',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'nuevaSolicitudCredito', pathMatch: 'full' },
      { path: 'nuevaSolicitudCredito', component: CrearSolicitudCreditoComponent, data: { titulo: 'Nueva Solicitud de Crédito', ruta: 'Solicitud de Crédito  /  Nueva' } },
      { path: 'editarSolicitudCredito/:id', component: EditarSolicitudCreditoComponent, data: { titulo: 'Editar Solicitud de Crédito', ruta: 'Solicitud de Crédito  /  Editar' } },
      { path: 'crearSolicitudGrupo', component: GrupoEmpresarialComponent, data: { titulo: 'Solicitud de Grupo', ruta: 'Solicitud de Crédito  /  Solicitud de Grupo', acceso:'solicitante' } },
      { path: 'crearSolicitudConsorcio', component: ConsorcioComponent, data: { titulo: 'Solicitud de Consorcio', ruta: 'Solicitud de Crédito  /  Solicitud de Consorcio', acceso: 'solicitante' } },
      { path: 'bandejaMisPendientes', component: BandejaSolicitudCreditoComponent, data: { titulo: 'Bandeja de Pendientes', ruta: 'Solicitud de Crédito  /  Bandeja de Pendientes' } },
      { path: 'consultaSolicitudCredito', component: BandejaSolicitudCreditoComponent, data: { titulo: 'Consulta Solicitudes de Crédito', ruta: 'Solicitud de Crédito  /  Consulta Solicitudes de Crédito', acceso:'general' } },
      { path: 'evaluarSolicitudCredito/:id', component: EvaluarCreditoComponent, data: { titulo: 'Evaluación de Crédito', ruta: 'Evaluación de Crédito' } },
      { path: 'revisarSolicitudCredito/:id', component: EvaluarCreditoComponent, data: { titulo: 'Revisión de Crédito', ruta: 'Revisión de Crédito' } },
     /*  { path: 'bandejaGruposPendiendes', component: GrupoEmpresarialComponent, data: { titulo: 'Bandeja de Grupos Pendientes', ruta: 'Solicitud de Crédito  /  Bandeja de Grupos Pendientes', acceso:'aprobador' } },
      { path: 'bandejaConsorciosPendiendes', component: ConsorcioComponent, data: { titulo: 'Bandeja de Consorcios Pendientes', ruta: 'Solicitud de Crédito  /  Bandeja de Consorcios Pendientes', acceso:'aprobador' } },
 */
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
