import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.interface';
import { ReporteMorosidad } from 'src/app/models/reporte-morosidad.interface';
import { ReporteRiesgoCliente } from 'src/app/models/reporte-riesgo-cliente.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ReporteSustentoEvaluacionService } from 'src/app/services/reporte-sustento-evaluacion.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-sustento-evaluacion-ec',
  templateUrl: './sustento-evaluacion-ec.component.html',
  styles: [
  ]
})
export class SustentoEvaluacionEcComponent implements OnInit {
  @Input() id_solicitud: string;
/*   id_solicitud_fake: string = "1"; */
  formulary: FormGroup;
  listadoSociedades: Sociedad[];
  reporteRiesgoCliente!: ReporteRiesgoCliente;
  reporteMorosidad!: ReporteMorosidad;

  listadoEmpresaSolicitud: Empresa[];
  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    /* 
      las sociedades listadas son las que pertenecen a la empresa,
      el servicio actual está listando todas.
    */
    private sociedadService: SociedadService,
    private solicitudService: SolicitudService,
    private reporteSustentoEvaluacionService: ReporteSustentoEvaluacionService,
  ) {
    this.formulary = this.formBuilder.group({
      sociedad: [''],
      representante_legal: [''],
    });
  }

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarSociedades();
    
   
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      console.log("listarSociedad:" + JSON.stringify(data));
      this.listadoSociedades = data;
    })
  }
  async listarEmpresas() {
    
    this.solicitudService.listarSolicitudCliente(this.id_solicitud).then(data => {
      this.listadoEmpresaSolicitud = data.payload;
      console.log(`listado de empresas ${JSON.stringify(this.listadoEmpresaSolicitud)}`);
      this.formulary['sociedad'].setvalue(data.payload[0].sociedad_codigo_sap);
    });
  }

  async listarReporteRiesgos(item: any) {
    console.log(`item reporte : ${JSON.stringify(item)}`);
    await this.reporteSustentoEvaluacionService.listarReporteRiesgos(item).then((data) => {
      console.log("listar reporte:" + JSON.stringify(data));
      this.reporteRiesgoCliente = data.payload;
    })
  }
  async listarReporteMorosidad(item: any) {
    await this.reporteSustentoEvaluacionService.listarReporteMorosidad(item).then((data) => {
      console.log("listar reporte morosidad:" + JSON.stringify(data));
      this.reporteMorosidad = data.payload;
    })
  }
  async listarReportePoderJudicial(item: any) {
    await this.reporteSustentoEvaluacionService.listarReportePoderJudicial(item).then((data) => {
      console.log("listar reporte poder judicial:" + JSON.stringify(data));
      this.reporteMorosidad = data.payload;
    })
  }

  async listarReportes(sociedad_codigo_sap: string, id_empresa: string) {

    let item = {
      id_solicitud: this.id_solicitud,
      sociedad_codigo_sap: sociedad_codigo_sap,
      id_empresa: id_empresa,
    }
    await this.listarReporteRiesgos(item);
    //await this.listarReporteMorosidad(item);
    /* console.log(`al seleccionar la sociedad -> ${JSON.stringify(event)}`); */
  }
  


}
