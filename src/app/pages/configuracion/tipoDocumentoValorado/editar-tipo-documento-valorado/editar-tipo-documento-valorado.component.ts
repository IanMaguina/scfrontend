import { TipoDocumentoValoradoService } from 'src/app/services/tipo-documento-valorado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { TipoDocumentoValorado } from 'src/app/models/tipo-documento-valorado.interface';
import { DocumentoValorado } from 'src/app/models/documento-valorado.interface';

@Component({
  selector: 'app-editar-tipo-documento-valorado',
  templateUrl: './editar-tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class EditarTipoDocumentoValoradoComponent implements OnInit {
  documentoValoradoData: DocumentoValorado;
  listadoTipoDocumentoValorado: TipoDocumentoValorado[]=[];
  editarFormDialog: any;
  formErrors = {
    'nombre': '',
    'tipo_documento_valorado': '',
  }
  validationMessages = {
    'nombre': {
      'required': 'el nombre es requerido.'
    },
    'tipo_documento_valorado': {
      'required': 'el tipo documento valorado es requerido.'
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
    private documentoValoradoService: TipoDocumentoValoradoService
  ) {
    this.documentoValoradoData = data;
    this.editarFormDialog = this.formBuilder.group({
      nombre: [this.documentoValoradoData.nombre, Validators.required],
      tipo_documento_valorado: [this.documentoValoradoData.tipo_documento_valorado, Validators.required],
    })
    this.editarFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.editarFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarTipoDocumentoValorado();
  }
  listarTipoDocumentoValorado(){
    this.documentoValoradoService.listarTipoDocumentosValorados().then(data => {
      if(data.header.exito){
        this.listadoTipoDocumentoValorado = data.payload;
      }
    });
  }

  async editarDocumentoValorado(form: any) {
    let documentoValorado: DocumentoValorado = {
      id: this.documentoValoradoData.id, 
      nombre: form.nombre,
      id_tipo_documento_valorado:form.tipo_documento_valorado.value,
    }; 
    if (form.nombre != this.documentoValoradoData.nombre){
      this.documentoValoradoService.actualizarDocumentoValorado(documentoValorado).then(data=>{
        if(data.header.exito){
          this.onNoClick('CONFIRM_DLG_YES');
        }else{
          this.onNoClick('CONFIRM_DLG_NO');
        }
      })
    }
  }


  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

}