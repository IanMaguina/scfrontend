import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidatorService } from '@services/form-validator.service';
import { CondicionPagoCliente } from 'src/app/models/condicion_pago_cliente.interface';
import { Estado } from 'src/app/models/estado.interface';

@Component({
  selector: 'app-bandeja-solicitud-condicion-pago',
  templateUrl: './bandeja-solicitud-condicion-pago.component.html',
  styles: [
  ]
})
export class BandejaSolicitudCondicionPagoComponent implements OnInit {

  displayedColumns: string[] = [
    'solicitud',
    'ruc',
    'razon_social',
    'grupo_cliente',
    'sociedad',
    'linea_producto',
    'fecha',
    'estado',
    'id',
  ]

  listadoSolicitudCondicionPago: CondicionPagoCliente[] = [];
  listadoEstadosSolicitud: Estado[] = [];

  formulary: FormGroup;
  formErrors = {
    'numero_documento': '',
    'estado': '',
    'solicitud': '',
    'fecha': '',

  }
  validationMessages = {
    'numero_documento': {
      'required': 'el numero_documento es requerido.'
    },
    'estado': {
      'required': 'el estado es requerido.'
    },
    'solicitud': {
      'required': 'el solicitud es requerido.'
    },
    'fecha': {
      'required': 'el fecha es requerido.'
    },

  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private formValidatorService:FormValidatorService,
  ) { 
    this.formulary = this.formBuilder.group({
      tipo_cliente: ['',],
      numero_documento: [''],
      estado: [''],
      solicitud: [''],
      fecha: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
  }


  buscarSolicitudes(formulary: any) { }
  editarSolicitud(formulary: any) { }

}