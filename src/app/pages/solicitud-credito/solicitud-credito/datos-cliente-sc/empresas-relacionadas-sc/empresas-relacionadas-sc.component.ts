import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudEmpresaRelacionada } from 'src/app/models/solicitud-empresa_relacionada.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-empresas-relacionadas-sc',
  templateUrl: './empresas-relacionadas-sc.component.html',
  styles: [
  ]
})
export class EmpresasRelacionadasScComponent implements OnInit {
  @Input() id_solicitud: number;
  formulary: FormGroup;
  displayedColumns: string[] = [
    'razon_social',
    'numero_documento',
    'id',
  ]
  listadoEmpresaRelacionadas: any[] = [];

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
    console.log("ngOnInit empresas relacionadas-->" + this.id_solicitud);
    if (this.id_solicitud !== null) {
      this.listar();
    }
  }

  listar() {
    this.solicitudService.listarSolicitudEmpresaRelacionada(this.id_solicitud).then(data => {
      this.listadoEmpresaRelacionadas = data.payload;
    })
  }

  async agregar(form: any) {
   // console.log("agregarReferencia" + JSON.stringify(form));
    let solicitud: SolicitudEmpresaRelacionada = await this.mapeoData(form)
    this.solicitudService.crearSolicitudEmpresaRelacionada(solicitud).then(data => {
      if (data.header.exito) {
        this.enviarMensajeSnack("Se agregó la empresa relacionada");
      this.listar();
      this.limpiarCampos();
      }
    })

  }

  async mapeoData(form: any) {
    let solicitud: SolicitudEmpresaRelacionada = {
      "id_solicitud": this.id_solicitud,
      "id_documento_identidad": 1,
      "numero_documento": form.numero_documento,
      "razon_social": form.razon_social
    }
    return solicitud;
  }

  eliminar(id: number) {
   // console.log("eliminarReferencia" + id);
    this.solicitudService.eliminarSolicitudEmpresaRelacionada(id).then(data => {
      if (data.header.exito) {
        this.enviarMensajeSnack("Se eliminó la empresa relacionada");
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
