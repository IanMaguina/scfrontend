import { ClienteAgrupacion } from './../../../../models/cliente-agrupacion.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { GrupoEmpresarialService } from '../../../../services/grupo-empresarial.service';
import { AutenticacionService } from '@services/autenticacion.service';
import { GlobalSettings } from 'src/app/shared/settings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-grupo-empresarial',
  templateUrl: './crear-grupo-empresarial.component.html',
  styles: [
  ]
})
export class CrearGrupoEmpresarialComponent implements OnInit {

  crearGrupoFormDialog: any;
  formErrors = {
    'nombre': '',
  }
  validationMessages = {
    'nombre': {
      'required': 'El nombre de grupo es requerido.'
    },
  };

  //Submitted form
  submitted = false;
  carga: boolean = false;
  userInfo: any;
  id_usuario: number = 0;
  id_perfilLogueo: number = 0;
  PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;
  isPerfilAdmin: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CrearGrupoEmpresarialComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private grupoEmpresarialService: GrupoEmpresarialService,
    private autenticacionService: AutenticacionService,
    private _snack: MatSnackBar,
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    console.log("usuario-->"+JSON.stringify(this.userInfo));

    this.crearGrupoFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
    })
    this.crearGrupoFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearGrupoFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {

    this.id_usuario = this.userInfo.id;
    this.id_perfilLogueo = this.userInfo.id_perfil;
    this.isAdmin();
  }

  async crearGrupo(form: any) {
    let clienteAgrupacion = await this.mapeoGrupo(form)
    this.grupoEmpresarialService.crearGrupoEmpresarial(clienteAgrupacion).then(data => {
      if (data.header.exito) {
        if (data.payload.warning){
          this.enviarMensajeSnack(data.payload.warning.mensaje);
          this.onNoClick({ payload: { data: data.payload, confirm: 'CONFIRM_DLG_NO' } });  
        }else{
          this.onNoClick({ payload: { data: data.payload, confirm: (data.payload === null ? 'CONFIRM_DLG_NO' : 'CONFIRM_DLG_YES') } });
        }
      } else {
        this.onNoClick({ payload: { data: data.payload, confirm: 'CONFIRM_DLG_NO' } });
      }

    });
  }

  async mapeoGrupo(form: any) {
    console.log("sociedad-->"+JSON.stringify(this.userInfo.sociedad.sociedad_codigo_sap));
    let clienteAgrupacion: ClienteAgrupacion = {
      "id_tipo_cliente": 1,
      "id_tipo_documento_identidad": null,
      "numero_documento": null,
      "nombre": form.nombre,
      "activo": true,
      "id_usuario": this.id_usuario,
      "sociedad_codigo_sap": this.userInfo.sociedad.sociedad_codigo_sap,
    }
    return clienteAgrupacion;
  }

  onNoClick(msg: any): void {
    this.dialogRef.close(msg);
  }

  isAdmin() {
    if (this.id_perfilLogueo === this.PERFIL_ADMINISTRADOR) {
      this.isPerfilAdmin = true;

    }
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'Cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
}
