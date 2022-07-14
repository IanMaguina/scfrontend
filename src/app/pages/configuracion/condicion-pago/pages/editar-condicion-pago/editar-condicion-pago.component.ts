import { Component, Inject, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RxwebValidators, NumericValueType } from '@rxweb/reactive-form-validators';

import { CondicionPagoRegularService } from '@services/condicion-pago-regular.service';
import { PopUPService } from '@services/pop-up.service';


@Component({
  selector: 'app-editar-condicion-pago',
  templateUrl: './editar-condicion-pago.component.html',
  styleUrls: ['./editar-condicion-pago-component.scss']
})
export class EditarCondicionPagoComponent implements OnInit {

  public formControl: FormControl = new FormControl('', [
    RxwebValidators.required({ message: 'Campo es requerido' }),
    RxwebValidators.numeric({ message: 'Solo se permiten caracteres numéricos', acceptValue: NumericValueType.PositiveNumber, allowDecimal: false }),
    RxwebValidators.minNumber({ message: 'La condición de pago debe ser mayor a 0', value: 1 })]);

  get condicionPagoRegularErrorMsg(): string {

    const errors = this.formControl?.errors;

    if (errors?.['required']) {
      return errors?.['required'].message;
    } else if (errors?.['numeric']) {
      return errors?.['numeric'].message;
    } else if (errors?.['minNumber']) {
      return errors?.['minNumber'].message;
    }

    return '';
  }

  constructor(
    public dialogRef: MatDialogRef<EditarCondicionPagoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private readonly condicionPagoRegularService: CondicionPagoRegularService,
    private readonly popUPService: PopUPService
  ) {

  }

  ngOnInit(): void {
    this.initFormControl();
  }

  private initFormControl(): void {
    this.formControl.setValue(this.data.params.valor);
  }

  public onActualizarCondicionPagoRegular() {

    const { id } = this.data.params;

    const body: Object = {
      valor: this.formControl.value
    }

    this.condicionPagoRegularService.updateCondicionPagoRegular(id, body).pipe(
      tap(({ header: { mensaje } }) => {
        this.popUPService.openPopPupAlertFunction(``, `${mensaje}`, 'Aceptar', (() => {
          this.dialogRef.close(true)
        }));
      }),
      catchError((_) => {
        this.popUPService.openPopPupAlert(``, `Ha ocurrido un error al intentar actualizar`, 'Cerrar');
        return of([]);
      })
    ).subscribe();
  }

  public validateFormControl() {
    return this.formControl.invalid && this.formControl.touched;
  }

}
