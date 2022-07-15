import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { RxwebValidators, NumericValueType } from '@rxweb/reactive-form-validators';

import { CondicionPagoRegularService } from '@services/condicion-pago-regular.service';
import { PopUPService } from '@services/pop-up.service';

@Component({
  selector: 'app-crear-condicion-pago',
  templateUrl: './crear-condicion-pago.component.html',
  styleUrls: ['./crear-condicion-pago.component.scss']
})
export class CrearCondicionPagoComponent implements OnInit {

  public formularioConfiguracionCondicionPagoRegular: FormGroup;

  public sociedad$: Observable<any>;
  public grupoCLiente$: Observable<any>;
  public lineaProducto$: Observable<any>;

  get sociedadErrorMsg(): string {

    const errors = this.formularioConfiguracionCondicionPagoRegular?.get('sociedad').errors;

    if (errors?.['required']) {
      return errors?.['required'].message;
    }

    return '';
  }

  get grupo_clienteErrorMsg(): string {

    const errors = this.formularioConfiguracionCondicionPagoRegular?.get('grupo_cliente').errors;

    if (errors?.['required']) {
      return errors?.['required'].message;
    }

    return '';
  }

  get linea_productoErrorMsg(): string {

    const errors = this.formularioConfiguracionCondicionPagoRegular?.get('linea_producto').errors;

    if (errors?.['required']) {
      return errors?.['required'].message;
    }

    return '';
  }

  get condicionPagoRegularErrorMsg(): string {

    const errors = this.formularioConfiguracionCondicionPagoRegular?.get('condicion_pago_regular').errors;

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
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrearCondicionPagoComponent>,
    private readonly condicionPagoRegularService: CondicionPagoRegularService,
    private readonly popUPService: PopUPService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSociedad();
    this.getGrupoCLiente();
    this.getLineaProducto();
  }

  private initForm() {
    this.formularioConfiguracionCondicionPagoRegular = this.formBuilder.group({
      sociedad: ['', RxwebValidators.required({ message: 'Campo es requerido' })],
      grupo_cliente: ['', RxwebValidators.required({ message: 'Campo es requerido' })],
      linea_producto: ['', RxwebValidators.required({ message: 'Campo es requerido' })],
      condicion_pago_regular: ['', [RxwebValidators.required({ message: 'Campo es requerido' }),
      RxwebValidators.numeric({ message: 'Solo se permiten caracteres numéricos', acceptValue: NumericValueType.PositiveNumber, allowDecimal: false }),
      RxwebValidators.minNumber({ message: 'La condición de pago debe ser mayor a 0', value: 1 })]]
    });
  }

  private getSociedad() {
    this.sociedad$ = this.condicionPagoRegularService.getSociedad();
  }

  private getGrupoCLiente() {
    this.grupoCLiente$ = this.condicionPagoRegularService.getGrupoCliente();
  }

  private getLineaProducto() {
    this.lineaProducto$ = this.condicionPagoRegularService.getLineaProducto();
  }

  public onAgregarNuevaCondicionPagoRegular() {
    const { sociedad, grupo_cliente, linea_producto, condicion_pago_regular } = this.formularioConfiguracionCondicionPagoRegular.value;

    const params: Object = {
      sociedad_codigo_sap: sociedad,
      grupo_cliente_codigo_sap: grupo_cliente,
      linea_producto_codigo_sap: linea_producto,
      valor: condicion_pago_regular
    }

    this.condicionPagoRegularService.addCondicionPagoRegular(params).pipe(
      tap(({ header: { mensaje } }) => {
        this.popUPService.openPopPupAlertFunction(``, `${mensaje}`, 'Aceptar', (() => {
          this.dialogRef.close(true)
        }));
      }),
      catchError((_) => {
        this.popUPService.openPopPupAlert(``, `Ha ocurrido un error al intentar crear el registro`, 'Cerrar');
        return of([]);
      })
    ).subscribe();
  }

  public validateFormControl(control:string) {
    return this.formularioConfiguracionCondicionPagoRegular.get(control)?.invalid && this.formularioConfiguracionCondicionPagoRegular.get(control)?.touched;
  }

}
