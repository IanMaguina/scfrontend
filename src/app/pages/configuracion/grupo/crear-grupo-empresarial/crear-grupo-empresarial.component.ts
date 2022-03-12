import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-grupo-empresarial',
  templateUrl: './crear-grupo-empresarial.component.html',
  styles: [
  ]
})
export class CrearGrupoEmpresarialComponent implements OnInit {
  crearGrupoFormDialog: any;
  formErrors = {
    'grupo': '',
  }
  validationMessages = {
    'grupo': {
      'required': 'el nombre de grupo es requerido.'
    },
  };
 
//Submitted form
submitted = false;
carga: boolean = false;
constructor(
  public dialogRef: MatDialogRef<CrearGrupoEmpresarialComponent>,
  private formBuilder: FormBuilder,
  private formValidatorService: FormValidatorService
) { 
  this.crearGrupoFormDialog = this.formBuilder.group({
    grupo: ['', Validators.required],
  })
  this.crearGrupoFormDialog.valueChanges.subscribe(() => {
    this.formErrors = this.formValidatorService.handleFormChanges(this.crearGrupoFormDialog, this.formErrors, this.validationMessages, this.submitted);
  })
}

ngOnInit(): void {
  console.log("ngOnInit");
}

crearGrupo(form:any){
  console.log("crearGrupo");
}
onNoClick(): void {
  this.dialogRef.close();
}

}
