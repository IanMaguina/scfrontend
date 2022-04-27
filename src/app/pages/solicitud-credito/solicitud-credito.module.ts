import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { SolicitudCreditoComponent } from './solicitud-credito.component';

/* utils */
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
/* componentes */

import { CrearSolicitudCreditoComponent } from './solicitud-credito/crear-solicitud-credito/crear-solicitud-credito.component';
import { DatosPlanesScComponent } from './solicitud-credito/datos-planes-sc/datos-planes-sc.component';
import { DatosObrasScComponent } from './solicitud-credito/datos-obras-sc/datos-obras-sc.component';
import { DatosAdjuntosScComponent } from './solicitud-credito/datos-adjuntos-sc/datos-adjuntos-sc.component';
import { DatosClienteScComponent } from './solicitud-credito/datos-cliente-sc/datos-cliente-sc.component';
import { DatosEmpresaScComponent } from './solicitud-credito/datos-cliente-sc/datos-empresa-sc/datos-empresa-sc.component';
import { DatosGrupoScComponent } from './solicitud-credito/datos-cliente-sc/datos-grupo-sc/datos-grupo-sc.component';
import { DatosConsorcioScComponent } from './solicitud-credito/datos-cliente-sc/datos-consorcio-sc/datos-consorcio-sc.component';
import { DatosConsorciadosScComponent } from './solicitud-credito/datos-cliente-sc/datos-consorciados-sc/datos-consorciados-sc.component';
import { ReferenciasComercialesScComponent } from './solicitud-credito/datos-cliente-sc/referencias-comerciales-sc/referencias-comerciales-sc.component';
import { PrincipalesClientesScComponent } from './solicitud-credito/datos-cliente-sc/principales-clientes-sc/principales-clientes-sc.component';
import { EmpresasRelacionadasScComponent } from './solicitud-credito/datos-cliente-sc/empresas-relacionadas-sc/empresas-relacionadas-sc.component';
import { GruposCoincidentesDialogComponent } from './solicitud-credito/datos-cliente-sc/grupos-coincidentes-dialog/grupos-coincidentes-dialog.component';
import { ConsorciosCoincidentesDialogComponent } from './solicitud-credito/datos-cliente-sc/consorcios-coincidentes-dialog/consorcios-coincidentes-dialog.component';
import { RiesgosScComponent } from './solicitud-credito/datos-planes-sc/riesgos-sc/riesgos-sc.component';
import { HipotecasScComponent } from './solicitud-credito/datos-planes-sc/hipotecas-sc/hipotecas-sc.component';
import { GarantiaLiquidaScComponent } from './solicitud-credito/datos-planes-sc/garantia-liquida-sc/garantia-liquida-sc.component';
import { CesionDerechosProveedoresScComponent } from './solicitud-credito/datos-planes-sc/cesion-derechos-proveedores-sc/cesion-derechos-proveedores-sc.component';
import { ResumenRiesgosScComponent } from './solicitud-credito/datos-planes-sc/resumen-riesgos-sc/resumen-riesgos-sc.component';
import { DlgModificarPlanScComponent } from './solicitud-credito/datos-planes-sc/dlg-modificar-plan-sc/dlg-modificar-plan-sc.component';
import { DlgNuevoPlanScComponent } from './solicitud-credito/datos-planes-sc/dlg-nuevo-plan-sc/dlg-nuevo-plan-sc.component';
import { TabFlujoCajaScComponent } from './solicitud-credito/datos-adjuntos-sc/tab-flujo-caja-sc/tab-flujo-caja-sc.component';
import { TabEstadosFinancierosScComponent } from './solicitud-credito/datos-adjuntos-sc/tab-estados-financieros-sc/tab-estados-financieros-sc.component';
import { TabDocumentosAdicionalesScComponent } from './solicitud-credito/datos-adjuntos-sc/tab-documentos-adicionales-sc/tab-documentos-adicionales-sc.component';
import { DlgNuevoProductoFlujoCajaScComponent } from './solicitud-credito/datos-adjuntos-sc/dlg-nuevo-producto-flujo-caja-sc/dlg-nuevo-producto-flujo-caja-sc.component';
import { DlgCuadroFlujoCajaScComponent } from './solicitud-credito/datos-adjuntos-sc/dlg-cuadro-flujo-caja-sc/dlg-cuadro-flujo-caja-sc.component';
import { EditarSolicitudCreditoComponent } from './solicitud-credito/editar-solicitud-credito/editar-solicitud-credito.component';

@NgModule({
  declarations: [
    SolicitudCreditoComponent,
    CrearSolicitudCreditoComponent,
    DatosPlanesScComponent,
    DatosObrasScComponent,
    DatosAdjuntosScComponent,
    DatosClienteScComponent,
    DatosEmpresaScComponent,
    DatosGrupoScComponent,
    DatosConsorcioScComponent,
    DatosConsorciadosScComponent,
    ReferenciasComercialesScComponent,
    PrincipalesClientesScComponent,
    EmpresasRelacionadasScComponent,
    GruposCoincidentesDialogComponent,
    ConsorciosCoincidentesDialogComponent,
    RiesgosScComponent,
    HipotecasScComponent,
    GarantiaLiquidaScComponent,
    CesionDerechosProveedoresScComponent,
    ResumenRiesgosScComponent,
    DlgModificarPlanScComponent,
    DlgNuevoPlanScComponent,
    TabFlujoCajaScComponent,
    TabEstadosFinancierosScComponent,
    TabDocumentosAdicionalesScComponent,
    DlgNuevoProductoFlujoCajaScComponent,
    DlgCuadroFlujoCajaScComponent,
    EditarSolicitudCreditoComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CdkStepperModule,
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
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  exports: [
    CdkStepperModule,
    MatStepperModule,

  ],
})
export class SolicitudCreditoModule { }
