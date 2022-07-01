import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Perfil } from 'src/app/models/perfil.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private perfilService: PerfilService,
    private matDialog: MatDialog,
    private usuarioService: UsuarioService
  ) {
    this.usuariodata = data;
    console.log("info del usuario: "+ JSON.stringify(data));
    this.crearFormDialog = this.formBuilder.group({
      nombre: [this.usuariodata.nombre, Validators.required],
      correo: [this.usuariodata.correo, Validators.required],
      perfil: [this.usuariodata.id_perfil, Validators.required],
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
      console.log("listarPerfiles:" + JSON.stringify(data));
      this.listadoPerfiles = data;
    })

  }

  async editarUsuario(form: any) {
    let usuario = await this.mapeoUsuario(form);
    this.usuarioService.actualizarUsuario(usuario).then( data =>{ 
    if(data.header.exito){
      if(data.payload && !data.payload.warning){
        this.onNoClick('CONFIRM_DLG_YES');
      }else if(data.payload && data.payload.warning ){
        this.callErrorDialog(data.payload.warning.mensaje);
        this.onNoClick('CONFIRM_DLG_NO');
      }
    }else{
      this.onNoClick('CONFIRM_DLG_NO');
    }
     
    });
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

  async mapeoUsuario(form: any) {
    let usuario: Usuario = {
      id: this.usuariodata.id,
      nombre: form.nombre,
      correo: form.correo,
      id_perfil: form.perfil,
    }
    return usuario;
  }

  callErrorDialog(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje,
    });
  }
}