import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-bandeja-solicitud-credito',
  templateUrl: './bandeja-solicitud-credito.component.html',
  styles: [
  ]
})
export class BandejaSolicitudCreditoComponent implements OnInit {
  listadoSolicitudes:any[]=[];
  listadoEstadosSolicitud:any[]=[];
  formulary: FormGroup;
  displayedColumns:string[] = [
    'estado',
    'correlativo',
    'ruc',
    'razon_social',
    'fecha_solicitud',
    'usuario'
  ];

  formErrors = {
    'tipo_cliente': '',
    'ruc': '',
    'estado': '',
    'solicitud': '',
    'fecha': '',

  }
  validationMessages = {
    'tipo_cliente': {
      'required': 'el tipo_cliente es requerido.'
    },
    'ruc': {
      'required': 'el ruc es requerido.'
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
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService,
  ) {
    this.formulary = this.formBuilder.group({
      tipo_cliente: ['',],
      ruc: [''],
      estado: [''],
      solicitud: [''],
      fecha: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  buscarSolicitudes(form:any){
    console.log("buscarSolicitudes:.."+JSON.stringify(form));
  }

}
