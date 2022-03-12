import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';


@Component({
  selector: 'app-asignar-integrantes-grupo',
  templateUrl: './asignar-integrantes-grupo.component.html',
  styles: [
  ]
})
export class AsignarIntegrantesGrupoComponent implements OnInit {

  grupoData: any;

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
 
  

  //Submitted form
  submitted = false;
  carga: boolean = false;


  //poner el tipado correcto => es data dummy
  listadoSociedades: Sociedad[] = [
    { codigo_sap: '0011', nombre: 'sociedad 1' },
    { codigo_sap: '0012', nombre: 'sociedad 2' },
  ];

  listadoIntegrantes: any[] = [];

  displayedColumns: string[] = [
    'codigocliente',
    'razonsocial',
    'ruc',
    'id',
  ];


  constructor(
    public dialogRef: MatDialogRef<AsignarIntegrantesGrupoComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService
  ) {
    this.grupoData = data;
    /*  */
    this.asignarEmpresaFormDialog = this.formBuilder.group({
      sociedad: ['', Validators.required],
      ruc: ['', Validators.required],
    })
    this.asignarEmpresaFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.asignarEmpresaFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
   
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  asignarEmpresaGrupo(form:any){
    console.log("asignarEmpresaGrupo");
  }
 
  QuitarEmpresa(item:any){
    console.log("QuitarEmpresa");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
