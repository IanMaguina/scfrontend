import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';
import { Empresa } from 'src/app/models/empresa.interface';
import { SolicitudCliente } from 'src/app/models/solicitud-cliente.interface';
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
  @Input() clienteData: ClienteDatos;
  @Input() id_solicitud: number;

  listaConsorciados: any = [];
  listadoZonales: Zonal[] = [];
  formularyForm: FormGroup;

  formErrors = {
    'sustento_comercial': '',
    'zonal_codigo_sap': '',
    'telefono': '',
    'correo': '',

  }
  validationMessages = {
    'sustento_comercial': {
      'required': 'el sustento_comercial es requerido.'
    },
    'zonal_codigo_sap': {
      'required': 'el zonal_codigo_sap es requerido.'
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
      zonal_codigo_sap: [''],
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
    this.listarZonales();
    if (this.id_solicitud) {
      this.solicitudService.listarConsorcioxSolicitud({ id_solicitud: this.id_solicitud }).then(res => {
        this.clienteData = res.payload;
        console.log("desde datos grupo-->" + JSON.stringify(this.clienteData.solicitud_cliente));
      })
    }

  }

  async listarZonales() {
    await this.zonalService.listarZonales().then((dato) => {
      this.listadoZonales = dato;
    })
  }

  async guardarDatosConsorcio(form: any) {
    console.log("OBJ--->" + JSON.stringify(form));

  }

}
