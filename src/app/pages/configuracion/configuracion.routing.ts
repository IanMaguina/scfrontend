import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { ConfiguracionComponent } from './configuracion.component';
import { EstrategiasComponent } from './estrategias/estrategias/estrategias.component';
import { ConsorcioComponent } from './consorcio/consorcio/consorcio.component';
import { GrupoEmpresarialComponent } from './grupo/grupo-empresarial/grupo-empresarial.component';
import { PlanesComponent } from './planes/planes/planes.component';
import { TipoDocumentoValoradoComponent } from './tipoDocumentoValorado/tipo-documento-valorado/tipo-documento-valorado.component';
import { SuplenciaComponent } from './suplencia/suplencia/suplencia.component';



const routes: Routes = [
    {

        path: 'configuracion',
        component: ConfiguracionComponent,
        children: [
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'usuarios', component: ListarUsuarioComponent },
            { path: 'estrategias', component: EstrategiasComponent },
            { path: 'consorcios', component: ConsorcioComponent },
            { path: 'grupos', component: GrupoEmpresarialComponent },
            { path: 'planes', component: PlanesComponent },
            { path: 'tipodocumentovalorado', component: TipoDocumentoValoradoComponent },
            { path: 'suplencias', component: SuplenciaComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

    ],
    exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
