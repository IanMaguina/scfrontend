import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-editar-tipo-documento-valorado',
  templateUrl: './editar-tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class EditarTipoDocumentoValoradoComponent implements OnInit {
  tipoDVData: any;
  editarFormDialog: any;
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

  //poner el tipado correcto

  constructor(
    public dialogRef: MatDialogRef<EditarTipoDocumentoValoradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) {
    this.tipoDVData = data;
    console.log("info del usuario: "+ JSON.stringify(data));
    this.editarFormDialog = this.formBuilder.group({
      nombre: [this.tipoDVData.nombre, Validators.required],
    })
    this.editarFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.editarFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("");
  }
 

  async editarTipoDocumentoValorado(form: any) {
    console.log("editarTipoDocumentoValorado");

    this.onNoClick();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}