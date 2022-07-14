import localeEs from '@angular/common/locales/es-PE';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConfiguracionComponent } from './configuracion.component';

//utilitarios
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTableResponsiveModule } from 'src/app/shared/tables/mat-table-responsive.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

/* componentes */
import { EstrategiasComponent } from './estrategias/estrategias/estrategias.component';
import { CrearEstrategiaSociedadComponent } from './estrategias/crear-estrategia-sociedad/crear-estrategia-sociedad.component';
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
import { PlanesComponent } from './planes/planes/planes.component';
import { CrearPlanComponent } from './planes/crear-plan/crear-plan.component';
import { ConfigurarPlanComponent } from './planes/configurar-plan/configurar-plan.component';
import { InformacionPlanComponent } from './planes/informacion-plan/informacion-plan.component';
import { CrucePlanesComponent } from './planes/cruce-planes/cruce-planes.component';
import { FlujoAprobacionComponent } from './planes/flujo-aprobacion/flujo-aprobacion.component';
import { MaximoLineaCreditoComponent } from './planes/maximo-linea-credito/maximo-linea-credito.component';
import { AsignarAprobadoresComponent } from './planes/asignar-aprobadores/asignar-aprobadores.component';
import { TipoDocumentoValoradoComponent } from './tipoDocumentoValorado/tipo-documento-valorado/tipo-documento-valorado.component';
import { SuplenciaComponent } from './suplencia/suplencia/suplencia.component';
import { CrearSuplenciaComponent } from './suplencia/crear-suplencia/crear-suplencia.component';
import { EditarSuplenciaComponent } from './suplencia/editar-suplencia/editar-suplencia.component';
import { EditarTipoDocumentoValoradoComponent } from './tipoDocumentoValorado/editar-tipo-documento-valorado/editar-tipo-documento-valorado.component';
import { CrearTipoDocumentoValoradoComponent } from './tipoDocumentoValorado/crear-tipo-documento-valorado/crear-tipo-documento-valorado.component';
import { AsistenteFacturacionComponent } from './asistenteFacturacion/asistente-facturacion/asistente-facturacion.component';
import { CrearAsistenteFacturacionComponent } from './asistenteFacturacion/crear-asistente-facturacion/crear-asistente-facturacion.component';
import { EditarAsistenteFacturacionComponent } from './asistenteFacturacion/editar-asistente-facturacion/editar-asistente-facturacion.component';
import { AprobadorAdicionalComponent } from './aprobadorAdicional/aprobador-adicional/aprobador-adicional.component';
import { CrearAprobadorAdicionalComponent } from './aprobadorAdicional/crear-aprobador-adicional/crear-aprobador-adicional.component';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { A11yModule } from '@angular/cdk/a11y';
import { TipoCambioComponent } from './tipo-cambio/tipo-cambio/tipo-cambio.component';
import { EditarGrupoEmpresarialComponent } from './grupo/editar-grupo-empresarial/editar-grupo-empresarial.component';
import { AsociadosNoSobregiroComponent } from './asociados-no-sobregiro/asociados-no-sobregiro/asociados-no-sobregiro.component';
import { CrearAsociadosNoSobregiroComponent } from './asociados-no-sobregiro/crear-asociados-no-sobregiro/crear-asociados-no-sobregiro.component';
import { CondicionPagoComponent } from './condicion-pago/pages/condicion-pago/condicion-pago.component';
import { CrearCondicionPagoComponent } from './condicion-pago/pages/crear-condicion-pago/crear-condicion-pago.component';
import { EditarCondicionPagoComponent } from './condicion-pago/pages/editar-condicion-pago/editar-condicion-pago.component';
import { TablaConfiguracionBandejaCondicionPagoRegularComponent } from './condicion-pago/components/tabla-configuracion-bandeja-condicion-pago-regular/tabla-configuracion-bandeja-condicion-pago-regular.component';
import { FormularioConfiguracionBandejaCondicionPagoRegularComponent } from './condicion-pago/components/formulario-configuracion-bandeja-condicion-pago-regular/formulario-configuracion-bandeja-condicion-pago-regular.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CondicionPagoRegularService } from '@services/condicion-pago-regular.service';
import { PopUPService } from '@services/pop-up.service';
import { getSpanishPaginatorIntl } from 'src/app/shared/language/spanish-paginator-intl';

registerLocaleData(localeEs, 'es-PE');

@NgModule({
  declarations: [
    ConfiguracionComponent,

    EstrategiasComponent,
    CrearEstrategiaSociedadComponent,
    EditarEstrategiaSociedadComponent,

    ListarUsuarioComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,

    GrupoEmpresarialComponent,
    CrearGrupoEmpresarialComponent,
    AsignarIntegrantesGrupoComponent,

    ConsorcioComponent,
    CrearConsorcioComponent,
    AsignarIntegrantesComponent,

    PlanesComponent,
    CrearPlanComponent,
    ConfigurarPlanComponent,
    InformacionPlanComponent,
    CrucePlanesComponent,
    FlujoAprobacionComponent,
    MaximoLineaCreditoComponent,
    AsignarAprobadoresComponent,

    SuplenciaComponent,
    CrearSuplenciaComponent,
    EditarSuplenciaComponent,

    TipoDocumentoValoradoComponent,
    CrearTipoDocumentoValoradoComponent,
    EditarTipoDocumentoValoradoComponent,
    AsistenteFacturacionComponent,
    CrearAsistenteFacturacionComponent,
    EditarAsistenteFacturacionComponent,
    AprobadorAdicionalComponent,
    CrearAprobadorAdicionalComponent,
    TipoCambioComponent,
    EditarGrupoEmpresarialComponent,
    AsociadosNoSobregiroComponent,
    CrearAsociadosNoSobregiroComponent,
    CondicionPagoComponent,
    CrearCondicionPagoComponent,
    EditarCondicionPagoComponent,
    TablaConfiguracionBandejaCondicionPagoRegularComponent,
    FormularioConfiguracionBandejaCondicionPagoRegularComponent

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
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    DragDropModule,
    MatTableResponsiveModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    RxReactiveFormsModule,
    A11yModule
  ],
  exports: [
    ConfiguracionComponent,

  ],
  providers: [
    CondicionPagoRegularService,
    PopUPService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ]
})
export class ConfiguracionModule { }
