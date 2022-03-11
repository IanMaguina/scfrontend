import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    TipoDocumentosValoradosComponent,
    ConfiguracionComponent,
    ListarUsuarioComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
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
    TipoDocumentosValoradosComponent
    
  ]
})
export class ConfiguracionModule { }
