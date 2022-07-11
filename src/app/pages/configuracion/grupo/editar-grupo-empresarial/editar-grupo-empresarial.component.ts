import { ClienteAgrupacion } from './../../../../models/cliente-agrupacion.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { GrupoEmpresarialService } from '../../../../services/grupo-empresarial.service';
import { AutenticacionService } from '@services/autenticacion.service';
import { GlobalSettings } from 'src/app/shared/settings';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar-grupo-empresarial',
  templateUrl: './editar-grupo-empresarial.component.html',
  styles: [
  ]
})
export class EditarGrupoEmpresarialComponent implements OnInit {
  grupoFormDialog: any;
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
  grupoEditar:ClienteAgrupacion=null;
  constructor(
    public dialogRef: MatDialogRef<EditarGrupoEmpresarialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private grupoEmpresarialService: GrupoEmpresarialService,
    private autenticacionService: AutenticacionService,
    private _snack: MatSnackBar,
  ) {
    this.grupoEditar = data;
    console.log("grupo emrpesarial--->" + JSON.stringify(data));

    this.userInfo = this.autenticacionService.getUserInfo();
    console.log("usuario-->"+JSON.stringify(this.userInfo));

    this.grupoFormDialog = this.formBuilder.group({
      nombre: [this.grupoEditar.nombre, Validators.required],
    })
    this.grupoFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.grupoFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {

    this.id_usuario = this.userInfo.id;
    this.id_perfilLogueo = this.userInfo.id_perfil;
    this.isAdmin();
  }

  async actualizarGrupo(form: any) {
    let clienteAgrupacion = await this.mapeoGrupo(form)
    this.grupoEmpresarialService.actualizarGrupoEmpresarial(clienteAgrupacion).then(data => {
      if (data.header.exito) {
      
        if (data.payload && data.payload.warning){
          this.enviarMensajeSnack(data.payload.warning.codigo.descripcion);
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
      "id":this.grupoEditar.id,
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

  onNoClick(msg: any) {
    if (msg==='CONFIRM_DLG_NO'){
      msg= { payload: { data: null, confirm: 'CONFIRM_DLG_NO' } };
    }
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
