import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-bandeja-solicitud-credito',
  templateUrl: './bandeja-solicitud-credito.component.html',
  styles: [
  ]
})
export class BandejaSolicitudCreditoComponent implements OnInit {
  listadoSolicitudes: Solicitud[] = [];
  listadoEstadosSolicitud: any[] = [];
  formulary: FormGroup;
  displayedColumns: string[] = [
    'estado',
    'correlativo',
    'numero_documento',
    'cliente',
    'fecha_creacion',
    'usuario',
    'id'
  ];

  formErrors = {
    'tipo_cliente': '',
    'numero_documento': '',
    'estado': '',
    'solicitud': '',
    'fecha': '',

  }
  validationMessages = {
    'tipo_cliente': {
      'required': 'el tipo_cliente es requerido.'
    },
    'numero_documento': {
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
    private router: Router,

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

  ngOnInit() {
    console.log("ngOnInit  bandeja de pendientes");
    this.listarSolicitud();
    this.listarEstadosSolicitud();
  }

  listarSolicitud() {
    this.solicitudService.listarSolicitudes().then(data => {
      console.log("solicitudes:"+JSON.stringify(data));
      this.listadoSolicitudes = data.payload;
    })
  }

  listarEstadosSolicitud(){
    this.solicitudService.listarEstadosSolicitud().then(data => {
        this.listadoEstadosSolicitud = data.payload;
    });

  }

  editarSolicitud(element: any) {
    console.log(JSON.stringify(element));
    this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', element.id]);


  }
  buscarSolicitudes(form: any) {
    console.log("buscarSolicitudes:.." + JSON.stringify(form));
  }

  /* Se eliminará la siguiente función */
  evaluar(element:any) {
    this.router.navigate(['app/solicitudcredito/evaluarSolicitud', element.id])
  }
}
