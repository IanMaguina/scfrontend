import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudCondicionPagoComponent } from './solicitud-condicion-pago.component';

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
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { CrearSolicitudCondicionPagoComponent } from './crear-solicitud-condicion-pago/crear-solicitud-condicion-pago.component';
import { ListarSolicitudCondicionPagoComponent } from './listar-solicitud-condicion-pago/listar-solicitud-condicion-pago.component';
import { BandejaSolicitudCondicionPagoComponent } from './bandeja-solicitud-condicion-pago/bandeja-solicitud-condicion-pago.component';
import { CondicionPagoService } from '@services/condicion-pago.service';
import { SnackBarService } from '@services/snack-bar.service';

@NgModule({
  declarations: [
    SolicitudCondicionPagoComponent,
    CrearSolicitudCondicionPagoComponent,
    ListarSolicitudCondicionPagoComponent,
    BandejaSolicitudCondicionPagoComponent,
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    MatRippleModule,
    CdkStepperModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule
  ],
  exports: [
    SolicitudCondicionPagoComponent
  ],
  providers: [
    CondicionPagoService,
    FormGroupDirective,
    SnackBarService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class SolicitudCondicionPagoModule { }
