import { SolicitudClienteDTO } from './../../../../../models/solicitud-cliente-dto.interface';
import { Empresa } from './../../../../../models/empresa.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZonalService } from 'src/app/services/zonal.service';
import { Zonal } from 'src/app/models/zonal.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudCliente } from 'src/app/models/solicitud-cliente.interface';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-datos-grupo-sc',
  templateUrl: './datos-grupo-sc.component.html',
  styles: [
  ]
})
export class DatosGrupoScComponent implements OnInit {
  @Input() clienteData: ClienteDatos;
  @Input() id_solicitud: number;

  displayedColumns: string[] = [
    'sociedad_codigo_sap',
    'numero_documento',
    'razon_social',
    'cliente_codigo_sap',
    'tipo_canal',
    'grupo_cliente',
    'zonal_codigo_sap',
    'sustento_comercial',
    'id'
  ]

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
    private _snack: MatSnackBar
  ) {
    this.formularyForm = this.formBuilder.group({
      empresasArray: this.formBuilder.array([])
    })
    this.formularyForm.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formularyForm, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  async ngOnInit() {
    this.listarZonales();
    if (this.id_solicitud) {
      this.solicitudService.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud }).then(async res => {
        this.clienteData = res.payload;

        console.log("solicitud - cliente-->" + JSON.stringify(this.clienteData));
        this.formularyForm.setControl('empresasArray', this.mapear(this.clienteData.solicitud_cliente));
        console.log("desde datos grupo-->" + JSON.stringify(this.formularyForm.get('empresasArray').value));
      })
    }
  }

  mapear(lista: SolicitudClienteDTO[]): FormArray {
    const valor = lista.map((SolicitudClienteDTO.asFormGroup));
    return new FormArray(valor);
  }

  get empresasArray(): FormArray {
    return this.formularyForm.get('empresasArray') as FormArray;
  }

  async listarZonales() {
    await this.zonalService.listarZonales().then((dato) => {
      this.listadoZonales = dato;
    })
  }

  async guardarSeccionGrupo(obj: any) {
    let solicitudCliente: SolicitudCliente = await this.mapeoData(obj)
    this.solicitudService.actualizarSolicitudCliente(solicitudCliente).then((data)=>{
      if(data.header.exito){
        this.enviarMensajeSnack("Se guardaron los cambios");
      }else{
        console.log("Error guardarSeccionGrupo:"+JSON.stringify(data));
      }
    });
  }

  async mapeoData(obj: SolicitudCliente) {
    let solicitudCliente: SolicitudCliente = {
      id: obj.id,
      sustento_comercial: obj.sustento_comercial,
      zonal_codigo_sap: obj.zonal_codigo_sap,
      telefono: obj.telefono,
      correo: obj.correo
    }
    return solicitudCliente;
  }

  enviarMensajeSnack(mensaje:string){
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
}
