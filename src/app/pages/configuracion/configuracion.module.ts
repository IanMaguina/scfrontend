import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { TipoDocumentosValoradosComponent } from './tipo-documentos-valorados/tipo-documentos-valorados.component';
import { ConfiguracionComponent } from './configuracion.component';
import { SharedModule } from 'src/app/shared/shared.module';


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
  ],
  exports: [
    TipoDocumentosValoradosComponent,
    UsuariosComponent
  ]
})
export class ConfiguracionModule { }
