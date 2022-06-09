import { ClienteAgrupacion } from './../../../../models/cliente-agrupacion.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { GrupoEmpresarialService} from '../../../../services/grupo-empresarial.service';
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
      'required': 'el nombre de grupo es requerido.'
    },
  };

  //Submitted form
  submitted = false;
  carga: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CrearGrupoEmpresarialComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private grupoEmpresarialService:GrupoEmpresarialService
  ) {
    this.crearGrupoFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
    })
    this.crearGrupoFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearGrupoFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void { 
  }

  async crearGrupo(form: any) {
    console.log("crearUsuario:" + JSON.stringify(form));
    let clienteAgrupacion = await this.mapeoGrupo(form)
    this.grupoEmpresarialService.crearGrupoEmpresarial(clienteAgrupacion).then( data =>{
      if(data.header.exito){
        this.onNoClick('CONFIRM_DLG_YES');
      }
    });
  }
  /* usuario usado rafa:12, se debe usar cookies para traer el usuario */
  async mapeoGrupo(form: any) {
    let clienteAgrupacion: ClienteAgrupacion = {
      "id_tipo_cliente": 1,
      "id_tipo_documento_identidad": null,
      "id_usuario_creacion": 12,
      "numero_documento": null,      
      "nombre": form.nombre,
      "activo": true
    }
    return clienteAgrupacion;
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

}
