import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { SociedadService } from 'src/app/services/sociedad.service';

@Component({
  selector: 'app-sustento-evaluacion-ec',
  templateUrl: './sustento-evaluacion-ec.component.html',
  styles: [
  ]
})
export class SustentoEvaluacionEcComponent implements OnInit {
  formulary: FormGroup;
  listadoSociedades:Sociedad[];
  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    /* 
      las sociedades listadas son las que pertenecen a la empresa,
      el servicio actual está listando todas.
    */
    private sociedadService: SociedadService,
    ) { 
      this.formulary = this.formBuilder.group({
        sociedad: [''],
      });
    }

  ngOnInit(): void {
    this.listarSociedades();
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      console.log("listarSociedad:" + JSON.stringify(data));
      this.listadoSociedades = data;
    })
  }

}
