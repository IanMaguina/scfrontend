import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.interface';
import { Zonal } from 'src/app/models/zonal.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ZonalService } from 'src/app/services/zonal.service';

@Component({
  selector: 'app-datos-consorcio-sc',
  templateUrl: './datos-consorcio-sc.component.html',
  styles: [
  ]
})
export class DatosConsorcioScComponent implements OnInit {
  @Input() clienteData: Empresa;
  listaConsorciados: any = [];
  listadoZonales: Zonal[] = [];
  formularyForm: FormGroup;

  formErrors = {
    'sustento_comercial': '',
    'id_zonal': '',
    'telefono': '',
    'correo': '',

  }
  validationMessages = {
    'sustento_comercial': {
      'required': 'el sustento_comercial es requerido.'
    },
    'id_zonal': {
      'required': 'el id_zonal es requerido.'
    },
    'telefono': {
      'required': 'el telefono es requerido.'
    },
    'correo': {
      'required': 'el correo es requerido.'
    },

  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private zonalService: ZonalService,
    private solicitudService: SolicitudService,
  ) {
    this.formularyForm = this.formBuilder.group({

      sustento_comercial: ['',],
      id_zonal: [''],
      telefono: [''],
      correo: [''],

    })
    this.formularyForm.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formularyForm, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("data de consorcio-->" + JSON.stringify(this.clienteData));
    console.log("ngOnInit");
  }
  guardarDatosConsorcio(form: any) {
    console.log("guardarDatosConsorcio..:"+ JSON.stringify(form));
  }
}
