import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styles: [
  ]
})
export class CrearPlanComponent implements OnInit {
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
    public dialogRef: MatDialogRef<CrearPlanComponent>,
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
  crearPlan(form:any){
    console.log("crearPlan");
    this.dialogRef.close()
    console.log("plan creado");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
