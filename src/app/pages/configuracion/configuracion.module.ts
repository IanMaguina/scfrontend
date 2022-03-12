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

import { EstrategiasComponent } from './estrategias/estrategias/estrategias.component';
import { CrearEstrategiaSociedadComponent } from './estrategias/crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { CrearEstrategiaTipoPlanComponent } from './estrategias/crear-estrategia-tipo-plan/crear-estrategia-tipo-plan.component';

import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';


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
  ],
  exports: [
    TipoDocumentosValoradosComponent

  ]
})
export class ConfiguracionModule { }
