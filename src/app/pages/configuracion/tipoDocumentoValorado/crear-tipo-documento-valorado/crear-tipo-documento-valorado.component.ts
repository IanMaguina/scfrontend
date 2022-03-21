import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-tipo-documento-valorado',
  templateUrl: './crear-tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class CrearTipoDocumentoValoradoComponent implements OnInit {

  crearFormDialog: any;
  formErrors = {
    'nombre': '',
  }
  validationMessages = {
    'nombre': {
      'required': 'el nombre es requerido.'
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearTipoDocumentoValoradoComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) {
    this.crearFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  crearTipoDocumentoValorado(form:any){
    console.log("crearTipoDocumentoValorado");
    
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}