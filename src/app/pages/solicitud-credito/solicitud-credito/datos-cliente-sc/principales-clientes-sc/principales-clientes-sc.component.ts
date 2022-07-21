import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudPrincipalCliente } from 'src/app/models/solicitud-principal-cliente.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-principales-clientes-sc',
  templateUrl: './principales-clientes-sc.component.html',
  styles: [
  ]
})
export class PrincipalesClientesScComponent implements OnInit {
  @Input() id_solicitud: number;
  @Input() id_estado_solicitud: number;

  formulary: FormGroup;
  displayedColumns: string[] = [
    'razon_social',
    'numero_documento',
    'id',
  ]
  listadoPrincipalesClientes: any[] = [
    {
      id: 1,
      numero_documento: '65432189745',
      razon_social: 'Cliente 1',
    },
  ];

  formErrors = {
    'numero_documento': '',
    'razon_social': '',

  }
  validationMessages = {
    'numero_documento': {
      'required': 'el ruc es requerido.'
    },
    'razon_social': {
      'required': 'el razon_social es requerido.'
    },


  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  constructor(
    private _formBuilder: FormBuilder,
    private _formValidatorService: FormValidatorService,
    private _snack: MatSnackBar,
    private solicitudService: SolicitudService
  ) {
    this.formulary = this._formBuilder.group({
      numero_documento: ['', Validators.required],
      razon_social: ['', Validators.required],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this._formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit principales clientes");
    if (this.id_solicitud !== null) {
      this.listar();
    }

  }

  listar() {
    this.solicitudService.listarSolicitudPrincipalClientexSolicitud(this.id_solicitud).then(data => {
      this.listadoPrincipalesClientes = data.payload;
    })

  }

  async agregar(form: any) {
    console.log("agregarReferencia" + JSON.stringify(form));
    let solicitud: SolicitudPrincipalCliente = await this.mapeoData(form)
    this.solicitudService.crearSolicitudPrincipalCliente(solicitud).then(data => {
      if (data.header.exito) {
        this.enviarMensajeSnack("Se agregó el cliente");
        this.listar();
        this.limpiarCampos();
      }

    })

  }

  async mapeoData(form: any) {
    let solicitud: SolicitudPrincipalCliente = {
      "id_solicitud": this.id_solicitud,
      "id_documento_identidad": 1,
      "numero_documento": form.numero_documento,
      "razon_social": form.razon_social
    }
    return solicitud;
  }

  eliminar(id: number) {
    console.log("eliminarReferencia" + id);
    this.solicitudService.eliminarSolicitudPrincipalCliente(id).then(data => {
      if (data.header.exito) {
        this.enviarMensajeSnack("Se eliminó el cliente");
        this.listar(); 
      }
     
    })

  }

  limpiarCampos() {
    this.formulary.get("numero_documento").setValue("");
    this.formulary.get("razon_social").setValue("");
  }
  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

}
