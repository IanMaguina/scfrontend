import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CondicionPagoService } from '../../../../services/condicion-pago.service';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-formulario-bandeja-solicitud-condicion-pago',
  templateUrl: './formulario-bandeja-solicitud-condicion-pago.component.html',
  styleUrls: ['./formulario-bandeja-solicitud-condicion-pago.component.css']
})
export class FormularioBandejaSolicitudCondicionPagoComponent implements OnInit {

  public formularioBandejaSolicitudCondicionPago: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly condicionPagoService: CondicionPagoService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formularioBandejaSolicitudCondicionPago = this.formBuilder.group({
      ruc: [''],
      solicitud: [''],
      fecha: ['']
    });
  }

  public onBuscarCondicionPago() {

    const { ruc, solicitud, fecha } = this.formularioBandejaSolicitudCondicionPago.value;

    const params = new HttpParams()
      .set('numero_documento', ruc)
      .set('fecha_limite', fecha);

    this.formularioBandejaSolicitudCondicionPago.reset();

    this.condicionPagoService.eventBuscarCondicionPago(params);

  }

}
