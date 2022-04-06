import { UsuarioService } from './../../../../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from 'src/app/models/usuario.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { Perfil } from 'src/app/models/perfil.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from './../../../../services/sociedad.service';
import { PerfilService } from 'src/app/services/perfil.service';
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
  listadoSociedades: Sociedad[] = [];
  listadoPerfiles: Perfil[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private sociedadService: SociedadService,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService
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
    this.perfilService.listarPerfiles().then(data => {
      console.log("listarPerfiles:" + JSON.stringify(data));
      this.listadoPerfiles = data;
    })

  }
  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      console.log("listarSociedad:" + JSON.stringify(data));
      this.listadoSociedades = data;
    })

  }

  async crearUsuario(form: any) {
    let usuario = await this.mapeoUsuario(form)
    console.log("crearUsuario:" + JSON.stringify(usuario));
    this.usuarioService.crearUsuario(usuario).then(()=>{
      this.onNoClick();
    });
    
  }

  async mapeoUsuario(form: any) {
    let usuario: Usuario = {
      nombre: form.nombre,
      correo: form.correo,
      id_perfil: form.perfil,
      sociedad_codigo_sap: form.sociedad
    }
    return usuario;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
