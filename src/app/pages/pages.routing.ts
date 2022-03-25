import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfiguracionRoutingModule } from './configuracion/configuracion.routing';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';


const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard', ruta: 'Dashboard'} }, 
          { path: '', redirectTo: 'dashboard', pathMatch:'full' }, 
          { path: 'configuracion', component: ConfiguracionComponent, data:{titulo: 'Configuración', ruta: 'Configuración'}  },  
          /*    { path: 'usuarios',component: UsuariosComponent }, */
        ]
      },
   
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes), 
      ConfiguracionRoutingModule
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
