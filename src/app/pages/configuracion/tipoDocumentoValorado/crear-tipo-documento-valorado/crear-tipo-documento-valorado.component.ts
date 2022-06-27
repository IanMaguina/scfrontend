import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentoValorado } from 'src/app/models/documento-valorado.interface';
import { TipoDocumentoValorado } from 'src/app/models/tipo-documento-valorado.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { TipoDocumentoValoradoService } from 'src/app/services/tipo-documento-valorado.service';

@Component({
  selector: 'app-crear-tipo-documento-valorado',
  templateUrl: './crear-tipo-documento-valorado.component.html',
  styles: [
  ]
})
export class CrearTipoDocumentoValoradoComponent implements OnInit {

  listadoTipoDocumentoValorado: TipoDocumentoValorado[] = [];
  crearFormDialog: any;
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

  constructor(
    public dialogRef: MatDialogRef<CrearTipoDocumentoValoradoComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private documentoValoradoService: TipoDocumentoValoradoService
  ) {
    this.crearFormDialog = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo_documento_valorado: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarTipoDocumentoValorado();
  }

  listarTipoDocumentoValorado() {
    this.documentoValoradoService.listarTipoDocumentosValorados().then(data => {
      if (data.header.exito) {
        this.listadoTipoDocumentoValorado = data.payload;
      }
    });
  }

  crearDocumentoValorado(form: any) {
    let documentoValorado: DocumentoValorado = {
      nombre: form.nombre,
      activo: true,
      id_tipo_documento_valorado: form.tipo_documento_valorado.id,

    };
    this.documentoValoradoService.crearDocumentoValorado(documentoValorado).then((result) => {
      if (result.header.exito) {
        this.dialogRef.close('CONFIRM_DLG_YES');
      } else {
        this.dialogRef.close('CONFIRM_DLG_NO');
      }
    });
  }

  onNoClick(msg: string): void {
    this.dialogRef.close(msg);
  }

}