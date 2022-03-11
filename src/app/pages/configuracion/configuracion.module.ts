import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { UsuariosComponent } from './usuarios/usuarios.component';
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
import { EstrategiasComponent } from './estrategias/estrategias/estrategias.component';
import { CrearEstrategiaSociedadComponent } from './estrategias/crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { CrearEstrategiaTipoPlanComponent } from './estrategias/crear-estrategia-tipo-plan/crear-estrategia-tipo-plan.component';

@NgModule({
  declarations: [
    TipoDocumentosValoradosComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    EstrategiasComponent,
    CrearEstrategiaSociedadComponent,
    CrearEstrategiaTipoPlanComponent,
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
    MatFormFieldModule
  ],
  exports: [
    TipoDocumentosValoradosComponent,
    UsuariosComponent
  ]
})
export class ConfiguracionModule { }
