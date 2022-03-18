import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-asignar-integrantes',
  templateUrl: './asignar-integrantes.component.html',
  styles: [
  ]
})
export class AsignarIntegrantesComponent implements OnInit {

  consorcioData: any;

  asignarEmpresaFormDialog: any;
  formErrors = {
    'sociedad': '',
    'ruc': '',
  }
  validationMessages = {
    'sociedad': {
      'required': 'el nombre es requerido.'
    },
    'ruc': {
      'required': 'el correo es requerido.',
    }
  };
  /* Participacion */
  participacionFormDialog: any;
  formErrorsP = {
    'files': '',
    'descripcion': '',
  }
  validationMessagesP = {
    'files': {
      'required': ' files es requerido.'
    },
    'descripcion': {
      'required': ' descripcion es requerido.',
    }
  };

  

  //Submitted form
  submitted = false;
  carga: boolean = false;
  //Submitted form participacion
  submitted2 = false;
  carga2: boolean = false;

  //poner el tipado correcto => es data dummy
  listadoSociedades: Sociedad[] = [
    { codigo_sap: '0011', nombre: 'sociedad 1' },
    { codigo_sap: '0012', nombre: 'sociedad 2' },
  ];

  listadoIntegrantes: any[] = [];

  displayedColumns: string[] = [
    'sociedad',
    'codigocliente',
    'razonsocial',
    'ruc',
    'canal',
    'zonal',
    'correo',
    'id',
  ];


  constructor(
    public dialogRef: MatDialogRef<AsignarIntegrantesComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService
  ) {
    this.consorcioData = data;
    /*  */
    this.asignarEmpresaFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      ruc: ['', Validators.required],
    })
    this.asignarEmpresaFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.asignarEmpresaFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
    /*  */
    this.participacionFormDialog = this.formBuilder.group({
      files: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    this.participacionFormDialog.valueChanges.subscribe(() => {
      this.formErrorsP = this.formValidatorService.handleFormChanges(this.participacionFormDialog, this.formErrorsP, this.validationMessagesP, this.submitted2);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  asignarEmpresaConsorcio(form:any){
    console.log("asignarEmpresaConsorcio");
  }
  adjuntarParticipacion(form:any){
    console.log("adjuntarParticipacion");
  }
  QuitarEmpresa(item:any){
    console.log("QuitarEmpresa");
  }
  async onFileSelected(event: any) {
    console.log("onFileSelected");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
