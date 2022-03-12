import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Sociedad } from 'src/app/models/sociedad.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-estrategia-sociedad',
  templateUrl: './crear-estrategia-sociedad.component.html',
  styles: ['./crear-estrategia-sociedad.component.css' ]
})
export class CrearEstrategiaSociedadComponent implements OnInit {
 
  estrategiaData:any;

  crearFormDialog: any;
  formErrors = {
    'sociedad': '',
    'usuario': '',
    'rol': '',
    'revisor': ''
  }
  validationMessages = {
    'sociedad': {
      'required': 'el nombre es requerido.'
    },
    'usuario': {
      'required': 'el correo es requerido.',
    },
    'rol': {
      'required': 'la sociedad es requerida.',
    },
    'revisor': {
      'required': 'el perfil es requerido.',
    }
  };
//Submitted form
submitted = false;
carga: boolean = false;

//poner el tipado correcto => es data dummy
listadoSociedades: Sociedad[] = [
  { codigo_sap:'0011', nombre: 'sociedad 1'},
  { codigo_sap: '0012', nombre: 'sociedad 2'},
];
 /* poner el tipo del modelo Rol */

 listadoRoles: any[] = [
  { id: 1, nombre: 'rol 1'},
  { id: 2, nombre: 'rol 2'},
];

  constructor(
    public dialogRef: MatDialogRef<CrearEstrategiaSociedadComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService
  ) { 
    this.crearFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      usuario: ['', Validators.required],
      rol: ['', Validators.required],
      revisor: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarRoles();
    this.listarSociedades();
  }
  async listarRoles() {
    console.log("listarRoles");
  }
  async listarSociedades() {
    console.log("listarSociedades");
  }
  crearEstrategiaSociedad(form:any){
    /* crear la estrategia */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
