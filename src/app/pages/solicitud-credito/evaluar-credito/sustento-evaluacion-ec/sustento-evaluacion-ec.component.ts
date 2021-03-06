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
import { ChangeDetectorRef } from '@angular/core';


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
  dataRiesgoCliente: RiesgoCliente;
  listadoRepresentanteLegal?: RiesgoClienteRepresentanteLegal[] = [];
  representante_legal_elegido: RiesgoClienteRepresentanteLegal;

  reportePoderJudicial: ReportePoderJudicial;
  reporteMorosidad: ReporteMorosidad;
  hiddenRrepresentanteLegal: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private sociedadService: SociedadService,
    private solicitudService: SolicitudService,
    private reporteSustentoEvaluacionService: ReporteSustentoEvaluacionService,
    private cdref: ChangeDetectorRef
  ) {
    this.formulary = this.formBuilder.group({
      sociedad: [''],
      empresa: [''],
      representante_legal: ['E'],
    });
  }

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarSociedades();
    this.dataRiesgoCliente = this.mapeoRiesgoCliente({});

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
    this.dataRiesgoCliente = this.mapeoRiesgoCliente({});
    let item = {
      id_solicitud: this.id_solicitud,
      sociedad_codigo_sap: (this.formulary.get('sociedad').value ? this.formulary.get('sociedad').value : "E"),
      id_empresa: (this.formulary.get('empresa').value.id_empresa ? this.formulary.get('empresa').value.id_empresa : ""),
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
      this.dataRiesgoCliente = this.mapeoRiesgoCliente(data.payload.reporte_riesgo_cliente[0])
    })
  }

  mapeoRiesgoCliente(data: RiesgoCliente) {
    return {
      "sociedad_codigo_sap": (data && data.sociedad_codigo_sap ? data.sociedad_codigo_sap : ""),
      "anexo_sap": (data && data.cliente_codigo_sap ? data.cliente_codigo_sap : ""),
      "ruc": (data && data.numero_documento ? data.numero_documento : ""),
      "semaforo_actual": (data && data.semaforo_actual ? data.semaforo_actual : ""),
      "deuda_total": (data && data.deuda_total ? data.deuda_total : ""),
      "reactiva": (data && data.reactiva ? data.reactiva : ""),
      "peor_calificacion": (data && data.peor_calificacion ? data.peor_calificacion : ""),
      "calificacion_normal": (data && data.calificacion_normal ? data.calificacion_normal : ""),
      "deuda_vencida": (data && data.deuda_vencida ? data.deuda_vencida : ""),
      "otros_reportes_negativos": (data && data.otros_reportes_negativos ? data.otros_reportes_negativos : ""),
      "impagos": (data && data.impagos ? data.impagos : ""),
      "protestos": (data && data.protestos ? data.protestos : ""),
      "deuda_laboral": (data && data.deuda_laboral ? data.protestos : ""),
      "deuda_tributaria": (data && data.deuda_tributaria ? data.deuda_tributaria : ""),
      "fecha_consulta": (data && data.fecha_consulta ? data.fecha_consulta : ""),
      "adjunto": (data && data.adjunto ? data.adjunto : "")
    };

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
    this.dataRiesgoCliente = this.mapeoRiesgoCliente({});
    console.log("elegimos: " + JSON.stringify(this.formulary.get('representante_legal').value));
    if (this.formulary.get('representante_legal').value == "E") {
      this.dataRiesgoCliente = this.mapeoRiesgoCliente(this.listadoRiesgoCliente)
      this.hiddenRrepresentanteLegal = true;
    } else {
      this.dataRiesgoCliente = this.mapeoRiesgoCliente(this.formulary.get('representante_legal').value);
      this.hiddenRrepresentanteLegal = false;
    }
  }

  ocultarCampos() {
    this.formulary.get('representante_legal').enable();
  }

  descargarAnexo(url) {
    console.log("este es mi dato de anexo : " + JSON.stringify(url));

    if (url.length > 1) {
      window.open(url, '_blank');
    } else {
      console.log("no se tiene un anexo cargado");
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  abrirEnlace(url: string){ window.open(url, "_blank"); }

}
