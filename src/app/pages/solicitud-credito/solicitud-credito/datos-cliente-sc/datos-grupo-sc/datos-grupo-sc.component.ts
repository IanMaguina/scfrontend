import { Empresa } from './../../../../../models/empresa.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZonalService } from 'src/app/services/zonal.service';
import { Zonal } from 'src/app/models/zonal.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudCliente } from 'src/app/models/solicitud-cliente.interface';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';

@Component({
  selector: 'app-datos-grupo-sc',
  templateUrl: './datos-grupo-sc.component.html',
  styles: [
  ]
})
export class DatosGrupoScComponent implements OnInit {
  @Input() clienteData: ClienteDatos;
  @Input() id_solicitud: number;

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
      'required': 'el zonal es requerido.'
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

      sustento_comercial: [''],
      zonal_codigo_sap: [''],
      telefono: [''],
      correo: [''],

    })
    this.formularyForm.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formularyForm, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("data de GRUPO-->" + JSON.stringify(this.clienteData));
 
    this.listarZonales();
  }
  async listarZonales() {
    await this.zonalService.listarZonales().then((dato) => {
      this.listadoZonales = dato;
    })
  }

  async guardarSeccionGrupo(form: any) {
    console.log("guardarSeccionGrupo--->" + JSON.stringify(form));
    let solicitud:SolicitudCliente = await this.mapeoData(form)
    this.solicitudService.actualizarSolicitudCliente(solicitud).then(data=>{
    })
  }

  async mapeoData(form: any) {
    let solicitud: SolicitudCliente = {
    id_solicitud:this.id_solicitud,
    sustento_comercial:form.sustento_comercial,
    zonal_codigo_sap:form.zonal_codigo_sap,
    telefono:form.telefono,
    correo: form.correo
  }
    return solicitud;
  }


}
