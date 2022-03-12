import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-consorcio',
  templateUrl: './crear-consorcio.component.html',
  styles: [
  ]
})
export class CrearConsorcioComponent implements OnInit {

  
  crearConsorcioFormDialog: any;
  formErrors = {
    'razonsocial': '',
    'ruc': '',
  }
  validationMessages = {
    'razonsocial': {
      'required': 'el nombre es requerido.'
    },
    'ruc': {
      'required': 'el correo es requerido.',
    }
  };
 
//Submitted form
submitted = false;
carga: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearConsorcioComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService
  ) { 
    this.crearConsorcioFormDialog = this.formBuilder.group({
      razonsocial: ['', Validators.required],
      ruc: ['', Validators.required],
    })
    this.crearConsorcioFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearConsorcioFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  crearConsorcio(form:any){
    console.log("crearConsorcio");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
