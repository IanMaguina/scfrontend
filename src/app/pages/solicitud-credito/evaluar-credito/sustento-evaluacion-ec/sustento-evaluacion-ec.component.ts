import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReporteMorosidad } from 'src/app/models/reporte-morosidad.interface';
import { ReporteRiesgoCliente } from 'src/app/models/reporte-riesgo-cliente.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ReporteSustentoEvaluacionService } from 'src/app/services/reporte-sustento-evaluacion.service';
import { SociedadService } from 'src/app/services/sociedad.service';

@Component({
  selector: 'app-sustento-evaluacion-ec',
  templateUrl: './sustento-evaluacion-ec.component.html',
  styles: [
  ]
})
export class SustentoEvaluacionEcComponent implements OnInit {
  @Input() id_solicitud:string;
  id_solicitud_fake:string = "1";
  formulary: FormGroup;
  listadoSociedades:Sociedad[];
  reporteRiesgoCliente?:ReporteRiesgoCliente;
  reporteMorosidad?:ReporteMorosidad;
  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    /* 
      las sociedades listadas son las que pertenecen a la empresa,
      el servicio actual está listando todas.
    */
    private sociedadService: SociedadService,
    private reporteSustentoEvaluacionService: ReporteSustentoEvaluacionService,
    ) { 
      this.formulary = this.formBuilder.group({
        sociedad: [''],
        representante_legal: [''],
      });
    }

  ngOnInit(): void {
    this.listarSociedades();
    this.listarReporteRiesgos(this.id_solicitud_fake);
    this.listarReporteMorosidad(this.id_solicitud_fake);
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      console.log("listarSociedad:" + JSON.stringify(data));
      this.listadoSociedades = data;
    })
  }

  listarReporteRiesgos(id_solicitud:string){
    this.reporteSustentoEvaluacionService.listarReporteRiesgos(id_solicitud).then((data)=>{
      console.log("listar reporte:" + JSON.stringify(data));
      this.reporteRiesgoCliente = data.payload;
    })
  }
listarReporteMorosidad(id_solicitud:string){
  this.reporteSustentoEvaluacionService.listarReporteMorosidad(id_solicitud).then((data)=>{
    console.log("listar reporte morosidad:" + JSON.stringify(data));
    this.reporteMorosidad = data.payload;
  })
}

  filtrarRepresentante(){

  }

}
