import { ConsorcioService } from './../../../../services/consorcio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';

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

  constructor(
    public dialogRef: MatDialogRef<CrearConsorcioComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private consorcioService:ConsorcioService
  ) { 
    this.crearConsorcioFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
      numero_documento: ['', Validators.required],
    })
    this.crearConsorcioFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearConsorcioFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  async crearConsorcio(form: any) {
    console.log("crearConsorcio:" + JSON.stringify(form));
    let clienteAgrupacion = await this.mapeoGrupo(form)
    this.consorcioService.crearConsorcio(clienteAgrupacion).then(()=>{
      this.onNoClick();
    });
    
  }

  async mapeoGrupo(form: any) {
    let clienteAgrupacion: ClienteAgrupacion = {
      "id_tipo_cliente": 2,
      "id_tipo_documento_identidad": 1,
      "numero_documento": form.numero_documento,      
      "nombre": form.nombre,
      "activo": true
    }
    return clienteAgrupacion;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
