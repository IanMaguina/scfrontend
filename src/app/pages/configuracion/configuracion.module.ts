import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { TipoDocumentosValoradosComponent } from './tipo-documentos-valorados/tipo-documentos-valorados.component';
import { ConfiguracionComponent } from './configuracion.component';

//utilitarios
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

import { EstrategiasComponent } from './estrategias/estrategias/estrategias.component';
import { CrearEstrategiaSociedadComponent } from './estrategias/crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { CrearEstrategiaTipoPlanComponent } from './estrategias/crear-estrategia-tipo-plan/crear-estrategia-tipo-plan.component';

import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { GrupoEmpresarialComponent } from './grupo/grupo-empresarial/grupo-empresarial.component';
import { ConsorcioComponent } from './consorcio/consorcio/consorcio.component';
import { CrearConsorcioComponent } from './consorcio/crear-consorcio/crear-consorcio.component';
import { CrearGrupoEmpresarialComponent } from './grupo/crear-grupo-empresarial/crear-grupo-empresarial.component';
import { AsignarIntegrantesComponent } from './consorcio/asignar-integrantes/asignar-integrantes.component';
import { AsignarIntegrantesGrupoComponent } from './grupo/asignar-integrantes-grupo/asignar-integrantes-grupo.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditarEstrategiaSociedadComponent } from './estrategias/editar-estrategia-sociedad/editar-estrategia-sociedad.component';
import { EditarEstrategiaTipoPlanComponent } from './estrategias/editar-estrategia-tipo-plan/editar-estrategia-tipo-plan.component';

@NgModule({
  declarations: [
    TipoDocumentosValoradosComponent,
    ConfiguracionComponent,

    EstrategiasComponent,
    CrearEstrategiaSociedadComponent,
    CrearEstrategiaTipoPlanComponent,

    ListarUsuarioComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
    GrupoEmpresarialComponent,
    ConsorcioComponent,
    CrearConsorcioComponent,
    CrearGrupoEmpresarialComponent,
    AsignarIntegrantesComponent,
    AsignarIntegrantesGrupoComponent,
    EditarEstrategiaSociedadComponent,
    EditarEstrategiaTipoPlanComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  exports: [
    TipoDocumentosValoradosComponent

  ]
})
export class ConfiguracionModule { }
