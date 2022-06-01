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
    this.reporteMorosidad = this.mapeoReporteBI({});

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
    this.reporteMorosidad = this.mapeoReporteBI({});
    let item = {
      id_solicitud: this.id_solicitud,
      sociedad_codigo_sap: (this.formulary.get('sociedad').value ? this.formulary.get('sociedad').value : "E"),
      id_empresa: (this.formulary.get('empresa').value.id_empresa ? this.formulary.get('empresa').value.id_empresa : ""),
    }
    this.listarReporteRiesgos(item);
    this.listarReporteMorosidad(item);
    this.listarReportePoderJudicial(item);
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
      "deuda_laboral": (data && data.deuda_laboral ? data.deuda_laboral : ""),
      "deuda_tributaria": (data && data.deuda_tributaria ? data.deuda_tributaria : ""),
      "fecha_consulta": (data && data.fecha_consulta ? data.fecha_consulta : ""),
      "adjunto": (data && data.adjunto ? data.adjunto : "")
    };

  }

  async listarReporteMorosidad(item: any) {
    console.log("puto item--->"+JSON.stringify(item));
    await this.reporteSustentoEvaluacionService.listarReporteMorosidad(item).then((data) => {
      this.reporteMorosidad = this.mapeoReporteBI(data.payload[0]);
      console.log("listar reporte morosidad:" + JSON.stringify(data));
    })
  }

  mapeoReporteBI(data: ReporteMorosidad) {
    return {
      "estado": (data && data.estado ? data.estado : ""),
      "sociedad_codigo_sap": (data && data.sociedad_codigo_sap ? data.sociedad_codigo_sap : ""),
      "numero_documento": (data && data.numero_documento ? data.numero_documento : ""),
      "anexo_sap": (data && data.anexo_sap ? data.anexo_sap : ""),
      "calificacion": (data && data.calificacion ? data.calificacion : ""),
      "promedio_mora_partida_abierta": (data && data.promedio_mora_partida_abierta ? data.promedio_mora_partida_abierta : ""),
      "promedio_mora_0_meses": (data && data.promedio_mora_0_meses ? data.promedio_mora_0_meses : ""),
      "promedio_mora_1_meses": (data && data.promedio_mora_1_meses ? data.promedio_mora_1_meses : ""),
      "promedio_mora_3_meses": (data && data.promedio_mora_3_meses ? data.promedio_mora_3_meses : ""),
      "promedio_mora_6_meses": (data && data.promedio_mora_6_meses ? data.promedio_mora_6_meses : ""),
      "promedio_mora_12_meses": (data && data.promedio_mora_12_meses ? data.promedio_mora_12_meses : ""),
      "adjunto": (data && data.adjunto ? data.adjunto : ""),
     
    };

  }

  async listarReportePoderJudicial(item: any) {
    await this.reporteSustentoEvaluacionService.listarReportePoderJudicial(item).then((data) => {
      console.log("listar reporte poder judicial:" + JSON.stringify(data));
      this.reportePoderJudicial = this.mapeoReportePoderJudicial(data.payload[0]);
    })
  }

  mapeoReportePoderJudicial(data: ReportePoderJudicial) {
    return {
      "id_solicitud": (data && data.id_solicitud ? data.id_solicitud : ""),
      "cliente_codigo_sap": (data && data.cliente_codigo_sap ? data.cliente_codigo_sap : ""),
      "sociedad_codigo_sap": (data && data.sociedad_codigo_sap ? data.sociedad_codigo_sap : ""),
      "sociedad": (data && data.sociedad ? data.sociedad : ""),
      "id_tipo_documento": (data && data.id_tipo_documento ? data.id_tipo_documento : ""),
      "numero_documento": (data && data.numero_documento ? data.numero_documento : ""),
      "razon_social": (data && data.razon_social ? data.razon_social : ""),
      "fecha_consulta": (data && data.fecha_consulta ? data.fecha_consulta : ""),
      "activo": (data && data.activo ? data.activo : ""),
      "estado_rpa": (data && data.estado_rpa ? data.estado_rpa : ""),
      "fecha_sistema": (data && data.fecha_sistema ? data.fecha_sistema : ""),
      "adjunto": (data && data.adjunto ? data.adjunto : ""),
     
    };

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
