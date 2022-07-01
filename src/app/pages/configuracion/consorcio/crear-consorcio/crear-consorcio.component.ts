import { ConsorcioService } from './../../../../services/consorcio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { AutenticacionService } from '@services/autenticacion.service';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-crear-consorcio',
  templateUrl: './crear-consorcio.component.html',
  styles: [
  ]
})
export class CrearConsorcioComponent implements OnInit {

  crearConsorcioFormDialog: any;
  formErrors = {
    'nombre': '',
    'numero_documento': '',
  }
  
  validationMessages = {
    'nombre': {
      'required': 'el nombre es requerido.'
    },
    'numero_documento': {
      'required': 'RUC es requerido.',
    }
  };

  //Submitted form
  submitted = false;
  carga: boolean = false;
  userInfo: any;
  id_userLogueo: number = 0;
  id_perfilLogueo: number = 0;
  PERFIL_ADMINISTRADOR: number = GlobalSettings.PERFIL_ADMINISTRADOR;
  isPerfilAdmin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearConsorcioComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private consorcioService: ConsorcioService,
    private autenticacionService: AutenticacionService
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.crearConsorcioFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
      numero_documento: ['', Validators.required],
    })
    this.crearConsorcioFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearConsorcioFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.id_userLogueo = this.userInfo.id;
    this.id_perfilLogueo = this.userInfo.id_perfil;
    this.isAdmin();
  }

  async crearConsorcio(form: any) {
    console.log("crearConsorcio:" + JSON.stringify(form));
    let clienteAgrupacion = await this.mapeoGrupo(form)
    this.consorcioService.crearConsorcio(clienteAgrupacion).then((data) => {
      if (data.header.exito) {
        this.onNoClick('CONFIRM_DLG_YES');
      }
    });

  }

  async mapeoGrupo(form: any) {
    let clienteAgrupacion: ClienteAgrupacion = {
      "id_tipo_cliente": 2,
      "id_tipo_documento_identidad": 1,
      "numero_documento": form.numero_documento,
      "nombre": form.nombre,
      "activo": true,
      "id_usuario_creacion": this.id_userLogueo,
    }
    return clienteAgrupacion;
  }

  onNoClick(msg: string): void {
    this.dialogRef.close(msg);
  }

  isAdmin() {
    if (this.id_perfilLogueo === this.PERFIL_ADMINISTRADOR) {
      this.isPerfilAdmin = true;
    }
  }

}
