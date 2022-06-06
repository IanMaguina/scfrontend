import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ConfiguracionRoutingModule } from './configuracion/configuracion.routing';
import { SolicitudCreditoRoutingModule } from './solicitud-credito/solicitud-credito.routing';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { SolicitudCreditoComponent } from './solicitud-credito/solicitud-credito.component';

import { SolicitudCondicionPagoComponent } from './solicitud-condicion-pago/solicitud-condicion-pago.component';


const routes: Routes = [
    {
        path: 'app', 
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard', ruta: 'Dashboard'}}, 
/*           { path: 'configuracion', component: ConfiguracionComponent, data:{titulo: 'Configuración', ruta: 'Configuración'},
          loadChildren:()=>ConfiguracionRoutingModule
          },   */
          { path: 'configuracion', component: ConfiguracionComponent, data:{titulo: 'Configuración', ruta: 'Configuración'}
          },            
          { path: 'solicitudcredito', component: SolicitudCreditoComponent, data:{titulo: 'Solicitud de Crédito', ruta: 'Solicitud de Crédito'}  },  
          { path: 'solicitudcondicionpago', component: SolicitudCondicionPagoComponent, data:{titulo: 'Solicitud de Condición de Pago', ruta: 'Solicitud de Condición de Pago'}  },  
          /*    { path: 'usuarios',component: UsuariosComponent }, */
        ]
      },
   
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes), 
      ConfiguracionRoutingModule,
      SolicitudCreditoRoutingModule,
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
