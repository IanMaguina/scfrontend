import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

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
  listadoSociedades: any[] = [
    { id: 1, nombre: 'sociedad 1'},
    { id: 2, nombre: 'sociedad 2'},
  ];
  listadoPerfiles: any[] = [
    { id: 1, nombre: 'perfil 1'},
    { id: 2, nombre: 'perfil 2'},
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
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
    console.log("listarPerfiles");
  }
  async listarSociedades() {
    console.log("listarSociedades");
  }

  crearUsuario(form: Usuario){
    console.log("crearUsuario");
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
