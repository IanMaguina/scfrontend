import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-empresa-sc',
  templateUrl: './datos-empresa-sc.component.html',
  styles: [
  ]
})
export class DatosEmpresaScComponent implements OnInit {

  formulary:FormGroup;
  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formulary = this._formBuilder.group({
      sociedadEmpresa: [''],
      rucEmpresa: [''],
      razonSocialEmpresa: [''],
      codigoCliEmpresa: [''],
      canalComEmpresa: [''],
      grupoCliEmpresa: [''],
      sustentoComercialEmpresa: [''],
      oficinaVentaEmpresa: [''],
      telefonoEmpresa: [''],
      correoEmpresa: [''],
    });
  }

  ngOnInit(): void {
  }

}
