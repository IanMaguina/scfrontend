import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { TipoDocumentosValoradosComponent } from './tipo-documentos-valorados/tipo-documentos-valorados.component';
import { ConfiguracionComponent } from './configuracion.component';



const routes: Routes = [
    {

        path: 'configuracion',
        component: ConfiguracionComponent,
        children: [
            { path: 'usuarios', component: ListarUsuarioComponent },
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'documentosvalorados', component: TipoDocumentosValoradosComponent },
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
