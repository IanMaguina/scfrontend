import { TipoDocumentoValoradoService } from 'src/app/services/tipo-documento-valorado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { TipoDocumentoValorado } from 'src/app/models/tipo-documento-valorado.interface';

@Component({
  selector: 'app-editar-tipo-documento-valorado',
  templateUrl: './editar-tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class EditarTipoDocumentoValoradoComponent implements OnInit {
  tipoDocumentoValoradoData: any;
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
    private tipoDocumentoValoradoService: TipoDocumentoValoradoService
  ) {
    this.tipoDocumentoValoradoData = data;
    console.log("info del id_tipo_documento_valorado: " + JSON.stringify(data));
    this.editarFormDialog = this.formBuilder.group({
      nombre: [this.tipoDocumentoValoradoData.nombre, Validators.required],
    })
    this.editarFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.editarFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("");
  }


  async editarTipoDocumentoValorado(form: any) {
    console.log("editarTipoDocumentoValorado--->" + JSON.stringify(form));
    let tipoDocumentoValorado: TipoDocumentoValorado = { id: this.tipoDocumentoValoradoData.id, nombre: form.nombre };
    if (form.nombre != this.tipoDocumentoValoradoData.nombre){
      this.tipoDocumentoValoradoService.actualizarDocumentoValorado(tipoDocumentoValorado).then(data=>{
        this.onNoClick();
      })
    }
    

    
  }


  onNoClick(): void {
    this.dialogRef.close('OK');
  }

}