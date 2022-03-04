import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [
    TipoDocumentosValoradosComponent,
    UsuariosComponent,
    ConfiguracionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDividerModule,
  ],
  exports: [
    TipoDocumentosValoradosComponent,
    UsuariosComponent
  ]
})
export class ConfiguracionModule { }
