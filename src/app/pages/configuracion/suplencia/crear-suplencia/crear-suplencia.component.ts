import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-suplencia',
  templateUrl: './crear-suplencia.component.html',
  styles: [
  ]
})
export class CrearSuplenciaComponent implements OnInit {
  
  listadoUsuarios:Usuario[]=[];
  crearFormDialog: any;
  formErrors = {
    'usuario': '',
    'usuario_suplente': '',
    'fecha_inicio': '',
    'fecha_fin': ''
  }
  validationMessages = {
    'usuario': {
      'required': 'el usuario es requerido.'
    },
    'usuario_suplente': {
      'required': 'el usuario_suplente es requerido.',
    },
    'fecha_inicio': {
      'required': 'la fecha_inicio es requerida.',
    },
    'fecha_fin': {
      'required': 'el fecha_fin es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;



  constructor(
    public dialogRef: MatDialogRef<CrearSuplenciaComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService
  ) {

    this.crearFormDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
      usuario_suplente: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
  }

  

  async crearSuplencia(form: any) {
    
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
