import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-consorcio-sc',
  templateUrl: './datos-consorcio-sc.component.html',
  styles: [
  ]
})
export class DatosConsorcioScComponent implements OnInit {

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
