import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsociadosNoSobregiroService } from '@services/asociados-no-sobregiro.service';
import { FormValidatorService } from '@services/form-validator.service';
import { SnackBarService } from '@services/snack-bar.service';
import { SociedadService } from '@services/sociedad.service';
import { AsociadoNoSobregiro } from 'src/app/models/asociado-no-sobregiro.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';

@Component({
  selector: 'app-asociados-no-sobregiro',
  templateUrl: './asociados-no-sobregiro.component.html',
  styles: [
  ]
})
export class AsociadosNoSobregiroComponent implements OnInit {
  listadoAsociadoNoSobregiro: AsociadoNoSobregiro[] = [];
  listadoSociedad: Sociedad[] = [];

  userInfo: any;
  id_usuario: number;
  formulary: FormGroup;
  displayedColumns: string[] = ['cliente_codigo_sap', 'sociedad', 'razon_social', 'id'];
  formErrors = {
    'numero_documento': '',
    'sociedad': '',
  }
  validationMessages = {
    'numero_documento': {
      'required': 'numero_documento es requerido.'
    },
    'sociedad': {
      'required': 'sociedad es requerida.',
    },
  };

  submitted = false;
  constructor(
    private sociedadService:SociedadService,
    private _snack:SnackBarService,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private asociadoNoSobregiroService:AsociadosNoSobregiroService,
  ) { 
    this.formulary = this.formBuilder.group({
      numero_documento: ['', Validators.required],
      sociedad: ['', Validators.required],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarSociedad();
    //this.listarAsociadosNoSobregiro();

  }

  listarSociedad(){
    this.sociedadService.listarSociedades().then(data=>{
      console.log("sociedades array: "+JSON.stringify(data));
      this.listadoSociedad = data;
    })
  }
  
/*   listarAsociadosNoSobregiro(){
    this.asociadoNoSobregiroService.listarAsociadosNoSobregiro().then(data => {
      this.listadoAsociadoNoSobregiro = data.payload;
    })
  } */

  crearAsociadoNoSobregiro(form:any){
   /* this.asociadoNoSobregiroService.crearAsociadoNoSobregiro(form).then(data => {
     if(data.header.exito){
      this._snack.openSnackBar('Se agregó el Asociado','Cerrar');
      this.listarAsociadosNoSobregiro();
     }
    })*/
  }
 

 eliminarAsociadoNoSobregiro(form:any){
  
  /* this.asociadoNoSobregiroService.eliminarAsociadoNoSobregiro(form.id).then(data => {
     if(data.header.exito){
      this._snack.openSnackBar('Se eliminó el Asociado','Cerrar');
      this.listarAsociadosNoSobregiro();
     }
    })*/

  } 


}
