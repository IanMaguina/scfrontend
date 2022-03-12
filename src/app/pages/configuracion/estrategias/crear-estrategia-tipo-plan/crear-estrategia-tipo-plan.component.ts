import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-estrategia-tipo-plan',
  templateUrl: './crear-estrategia-tipo-plan.component.html',
  styles: [
  ]
})
export class CrearEstrategiaTipoPlanComponent implements OnInit {

 
 
  estrategiaData:any;

  crearFormDialog: any;
  formErrors = {
    'plan': '',
    'tipoplan': '',
    'usuario': '',
    'orden': ''
  }
  validationMessages = {
    'plan': {
      'required': 'el nombre es requerido.'
    },
    'tipoplan': {
      'required': 'el correo es requerido.',
    },
    'usuario': {
      'required': 'la sociedad es requerida.',
    },
    'orden': {
      'required': 'el perfil es requerido.',
    }
  };
//Submitted form
submitted = false;
carga: boolean = false;

//poner el tipado correcto => es data dummy
listadoPlanes: any[] = [
  { codigo_sap:'0011', nombre: 'plan 1'},
  { codigo_sap: '0012', nombre: 'plan 2'},
];
 /* poner el tipo del modelo Rol */

 listadoUsuarios: any[] = [
  { id: 1, nombre: 'rol 1'},
  { id: 2, nombre: 'rol 2'},
];

  constructor(
    public dialogRef: MatDialogRef<CrearEstrategiaTipoPlanComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService
  ) { 
    this.crearFormDialog = this.formBuilder.group({
      plan: ['', Validators.required],
      tipoplan: ['', Validators.required],
      usuario: ['', Validators.required],
      orden: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarPlanes();
    this.listarUsuarios();
  }
  async listarPlanes() {
    console.log("listarPlanes");
  }
  async listarUsuarios() {
    console.log("listarUsuarios");
  }
  crearEstrategiaTipoPlan(form:any){
    /* crear la estrategia */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
