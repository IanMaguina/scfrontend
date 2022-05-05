import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ZonalService } from 'src/app/services/zonal.service';

@Component({
  selector: 'app-datos-empresa-sc',
  templateUrl: './datos-empresa-sc.component.html',
  styles: [
  ]
})
export class DatosEmpresaScComponent implements OnInit {
  @Input() clienteData: Empresa[];
  formulary: FormGroup;
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
    this.formulary = this.formBuilder.group({
      sustento_comercial: ['',],
      id_zonal: [''],
      telefono: [''],
      correo: [''],
    });
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
  }
  guardarDatosEmpresa(form: any) {
    console.log("guardarDatosConsorcio..:" + JSON.stringify(form));
  }

}
