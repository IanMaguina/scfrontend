import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-usuario-dialog',
  templateUrl: './crear-usuario-dialog.component.html',
  styleUrls: ['./crear-usuario-dialog.component.css']
})
export class CrearUsuarioDialogComponent implements OnInit {
  usuariodata: any;
  crearFormDialog: any;
  formErrors = {
    'nombre': '',
    'correo': '',
    'sociedad': '',
    'perfil': ''
  }
  validationMessages = {
    'nombre': {
      'required': 'el nombre es requerido.'
    },
    'correo': {
      'required': 'el correo es requerido.',
    },
    'sociedad': {
      'required': 'la sociedad es requerida.',
    },
    'perfil': {
      'required': 'el perfil es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  //poner el tipado correcto
  listadoSociedades: any[] = [];
  listadoPerfiles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService
  ) {
  
    this.crearFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      sociedad: ['', Validators.required],
      perfil: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
   }

  ngOnInit(): void {
    this.listarPerfiles();
    this.listarSociedades();
  }
  async listarPerfiles() {
    
  }
  async listarSociedades() {
    
  }

  crearUsuario(form: Usuario){

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
