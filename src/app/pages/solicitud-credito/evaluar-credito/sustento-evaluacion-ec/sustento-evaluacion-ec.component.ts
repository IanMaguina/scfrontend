import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { SociedadService } from 'src/app/services/sociedad.service';

const ELEMENT_DATA = [
  {name: 'Fecha', respuesta: 'DD/MM/AA'},
  {name: 'Semáforo Actual', respuesta: 'DD/MM/AA'},
  {name: 'Deuda total SBS', respuesta: 'DD/MM/AA'},
  {name: 'Beryllium', respuesta: 'DD/MM/AA'},
  {name: 'Boron', respuesta: 'DD/MM/AA'},
  {name: 'Carbon', respuesta: 'DD/MM/AA'},
  {name: 'Nitrogen', respuesta: 'DD/MM/AA'},
  {name: 'Oxygen', respuesta: 'DD/MM/AA'},
  {name: 'Fluorine', respuesta: 'DD/MM/AA'},
  {name: 'Neon', respuesta: 'DD/MM/AA'},
  {name: 'Fluorine', respuesta: 'DD/MM/AA'},
  {name: 'Neon', respuesta: 'DD/MM/AA'},
  {name: 'otros Reportes Negativos', respuesta: 'DD/MM/AA'}
];


@Component({
  selector: 'app-sustento-evaluacion-ec',
  templateUrl: './sustento-evaluacion-ec.component.html',
  styles: [
  ]
})

export class SustentoEvaluacionEcComponent implements OnInit {
  formulary: FormGroup;
  listadoSociedades:Sociedad[];
  cols=3;
  rowHeight = '650px';



  constructor(
    
    private responsive: BreakpointObserver,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    /* 
      las sociedades listadas son las que pertenecen a la empresa,
      el servicio actual está listando todas.
    */
    private sociedadService: SociedadService,
    ) 
    
    { 
      this.formulary = this.formBuilder.group({
        sociedad: [''],
      });
    }


    displayedColumns: string[] = ['name', 'respuesta'];
    dataSource = ELEMENT_DATA;



  ngOnInit(): void {
    this.listarSociedades();
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ])
    .subscribe(result => {
        this.cols =3;
        this.rowHeight = "980px";

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]){
          this.cols = 1;
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]){
          this.cols = 1;
          this.rowHeight ="980px";
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]){
          this.cols = 1;
        }
        else if (breakpoints[Breakpoints.TabletLandscape]){
          this.cols = 2;
        }



    });



  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      console.log("listarSociedad:" + JSON.stringify(data));
      this.listadoSociedades = data;
    })
  }
  
}
