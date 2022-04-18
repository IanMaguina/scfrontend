import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-empresas-relacionadas-sc',
  templateUrl: './empresas-relacionadas-sc.component.html',
  styles: [
  ]
})
export class EmpresasRelacionadasScComponent implements OnInit {

  formulary: FormGroup;
  displayedColumns:string[]= [
   
    'ruc',
    'razon_social',
    'id'
  ]
  listadoEmpresasRelacionadas:any[]=[
    {
      id: 1,
      ruc: '65432189745',
      razon_social: 'Cliente 1',
    },
  ];

  formErrors = {
    'ruc': '',
    'razon_social': '',
   
  }
  validationMessages = {
    'ruc': {
      'required': 'el ruc es requerido.'
    },
    'razon_social': {
      'required': 'el razon_social es requerido.'
    },
   
    
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _formValidatorService:FormValidatorService
  ) { 
    this.formulary = this._formBuilder.group({
      ruc: ['', Validators.required],
      razon_social: ['', Validators.required],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this._formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit Ref. Comerciales");
  }
  agregarEmpresaRelacionada(form:any){
    console.log("agregarReferencia"+JSON.stringify(form));
  }
  eliminarEmpresaRelacionada(idReferencia:number){
    console.log("eliminarReferencia"+idReferencia);
  }

}
