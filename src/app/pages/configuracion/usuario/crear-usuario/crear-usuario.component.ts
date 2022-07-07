import { UsuarioService } from './../../../../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidatorService } from 'src/app/services/form-validator.service';

import { Usuario } from 'src/app/models/usuario.interface';
import { Perfil } from 'src/app/models/perfil.interface';
import { PerfilService } from 'src/app/services/perfil.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuariodata: Usuario;
  crearFormDialog: any;
  formErrors = {
    'nombre': '',
    'correo': '', 
    'perfil': ''
  }
  validationMessages = {
    'nombre': {
      'required': 'el nombre es requerido.'
    },
    'correo': {
      'required': 'el correo es requerido.',
    }, 
    'perfil': {
      'required': 'el perfil es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  //poner el tipado correcto 
  listadoPerfiles: Perfil[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService, 
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private matDialog: MatDialog,
    private _snack: MatSnackBar
  ) {

    this.crearFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required], 
      perfil: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarPerfiles(); 
  }
  async listarPerfiles() {
    this.perfilService.listarPerfiles().then(data => {
      this.listadoPerfiles = data;
    })
  }
   

  async crearUsuario(form: any) {
    let usuario = await this.mapeoUsuario(form)
    console.log("crearUsuario:" + JSON.stringify(usuario));
    this.usuarioService.crearUsuario(usuario).then((data)=>{
      if(data.header.exito){
        if(data.payload.warning){
          this.callErrorDialog(data.payload.warning.mensaje);
          this.onNoClick('CONFIRM_DLG_NO');
        }else{
          this.onNoClick('CONFIRM_DLG_YES');          
        }
      }else{
        this.enviarMensajeSnack(data.header.mensaje);
      }
    });
  }

  async mapeoUsuario(form: any) {
    let usuario: Usuario = {
      nombre: form.nombre,
      correo: form.correo,
      id_perfil: form.perfil, 
    }
    return usuario;
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  callErrorDialog(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje,
    });
  }

}
