import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-referencias-comerciales-sc',
  templateUrl: './referencias-comerciales-sc.component.html',
  styles: [
  ]
})
export class ReferenciasComercialesScComponent implements OnInit {
  formulary: FormGroup;
  displayedColumns:string[]= [
    'empresa',
    'ruc',
    'contacto',
    'cargo',
    'telefono',
    'id'
  ]
  listadoReferenciasComerciales:any[]=[
    {
      id: 1,
      empresa: 'Empresa 1',
      ruc: '65432189745',
      contacto: 'Proveedor 1',
      cargo: 'Gerente',
      telefono: '985432156'
    },
  ];
  formErrors = {
    'empresa': '',
    'ruc': '',
    'contacto': '',
    'cargo': '',
    'telefono': '',
   
  }
  validationMessages = {
    'empresa': {
      'required': 'el empresa es requerido.'
    },
    'ruc': {
      'required': 'el ruc es requerido.'
    },
    'contacto': {
      'required': 'el contacto es requerido.'
    },
    'cargo': {
      'required': 'el cargo es requerido.'
    },
    'telefono': {
      'required': 'el telefono es requerido.'
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
      empresa: ['', Validators.required],
      ruc: ['', Validators.required],
      contacto: ['', Validators.required],
      cargo: ['', Validators.required],
      telefono: ['', Validators.required]
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this._formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit Ref. Comerciales");
  }
  agregarReferencia(form:any){
    console.log("agregarReferencia"+JSON.stringify(form));
  }
  eliminarReferencia(idReferencia:number){
    console.log("eliminarReferencia"+idReferencia);
  }

}
