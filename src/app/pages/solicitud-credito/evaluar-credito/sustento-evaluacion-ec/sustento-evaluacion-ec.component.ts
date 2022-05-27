import { RiesgoClienteRepresentanteLegal } from './../../../../models/riesgo-cliente-representante-legal.interface';
import { RiesgoCliente } from './../../../../models/riesgo-cliente.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.interface';
import { ReporteMorosidad } from 'src/app/models/reporte-morosidad.interface';
import { ReporteRiesgoCliente } from 'src/app/models/reporte-riesgo-cliente.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { ReporteSustentoEvaluacionService } from 'src/app/services/reporte-sustento-evaluacion.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ReportePoderJudicial } from 'src/app/models/reporte-poder-judicial.interface';



@Component({
  selector: 'app-sustento-evaluacion-ec',
  templateUrl: './sustento-evaluacion-ec.component.html',
  styles: [
  ]
})

export class SustentoEvaluacionEcComponent implements OnInit {
  @Input() id_solicitud: string;
  formulary: FormGroup;
  listadoSociedades: Sociedad[];
  listadoEmpresaSolicitud: Empresa[];

  listadoRiesgoCliente: RiesgoCliente;
  listadoRepresentanteLegal?: RiesgoClienteRepresentanteLegal[] = [];
  representante_legal_elegido: RiesgoClienteRepresentanteLegal;

  reportePoderJudicial: ReportePoderJudicial;
  reporteMorosidad: ReporteMorosidad;

  constructor(
    private formBuilder: FormBuilder,
    private sociedadService: SociedadService,
    private solicitudService: SolicitudService,
    private reporteSustentoEvaluacionService: ReporteSustentoEvaluacionService,
  ) {
    this.formulary = this.formBuilder.group({
      sociedad: [''],
      empresa: [''],
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

    });
  }

  async listarReportes() {

    let item = {
      id_solicitud: this.id_solicitud,
      sociedad_codigo_sap: this.formulary.get('sociedad').value,
      id_empresa: this.formulary.get('empresa').value,
    }
    this.listarReporteRiesgos(item);
    this.listarReporteMorosidad(item);
    await this.listarReportePoderJudicial(item);
  }

  async listarReporteRiesgos(item: any) {
    //console.log(`item reporte : ${JSON.stringify(item)}`);
    await this.reporteSustentoEvaluacionService.listarReporteRiesgos(item).then((data) => {
      console.log("listar reporte riesgo:" + JSON.stringify(data));
      this.listadoRiesgoCliente = data.payload.reporte_riesgo_cliente[0];
      this.listadoRepresentanteLegal = data.payload.reporte_riesgo_cliente_representante_legal;
    })
  }
  async listarReporteMorosidad(item: any) {
    await this.reporteSustentoEvaluacionService.listarReporteMorosidad(item).then((data) => {
      this.reporteMorosidad = data.payload[0];
      console.log("listar reporte morosidad:" + JSON.stringify(this.reporteMorosidad));
    })
  }
  async listarReportePoderJudicial(item: any) {
    await this.reporteSustentoEvaluacionService.listarReportePoderJudicial(item).then((data) => {
      console.log("listar reporte poder judicial:" + JSON.stringify(data));
      this.reportePoderJudicial = data.payload[0];
    })
  }


  filtrarRepresentante() {
    console.log("elegimos: "+ JSON.stringify(this.formulary.get('representante_legal').value));
    
    //this.representante_legal_elegido = this.formulary.get('representante_legal').value;
  }


}
