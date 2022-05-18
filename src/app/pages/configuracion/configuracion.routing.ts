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
import { AsistenteFacturacionComponent } from './asistenteFacturacion/asistente-facturacion/asistente-facturacion.component';
import { AprobadorAdicionalComponent } from './aprobadorAdicional/aprobador-adicional/aprobador-adicional.component';
import { PagesComponent } from '../pages.component';

const routes: Routes = [
    {
        path: 'app/configuracion',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'usuarios', component: ListarUsuarioComponent, data:{titulo: 'Usuarios', ruta: 'Configuración  /  Usuarios'}  },
            { path: 'estrategias', component: EstrategiasComponent, data:{titulo: 'Estrategias', ruta: 'Configuración  /  Estrategias'}  },
            { path: 'consorcios', component: ConsorcioComponent, data:{titulo: 'Consorcios', ruta: 'Configuración  /  Consorcios'}  },
            { path: 'grupos', component: GrupoEmpresarialComponent, data:{titulo: 'Grupos', ruta: 'Configuración  /  Grupos'}  },
            { path: 'planes', component: PlanesComponent, data:{titulo: 'Planes', ruta: 'Configuración  /  Planes'}  },
            { path: 'tipodocumentovalorado', component: TipoDocumentoValoradoComponent, data:{titulo: 'tipo documento valorado', ruta: 'Configuración  /  Tipo documento valorado'}  },
            { path: 'suplencias', component: SuplenciaComponent, data:{titulo: 'Suplencias', ruta: 'Configuración  /  Suplencias'}  },
            { path: 'asistentefacturacion', component: AsistenteFacturacionComponent, data:{titulo: 'Asistente facturacion', ruta: 'Configuración  /  Asistente facturacion'}  },
            { path: 'aprobadoradicional', component: AprobadorAdicionalComponent, data:{titulo: 'Aprobador adicional', ruta: 'Configuración  /  Aprobador adicional'}  }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
