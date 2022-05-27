import { RiesgoClienteRepresentanteLegal } from './../../../../models/riesgo-cliente-representante-legal.interface';
import { RiesgoCliente } from './../../../../models/riesgo-cliente.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  @Input() id_solicitud: string;
/*   id_solicitud_fake: string = "1"; */
  formulary: FormGroup;
  listadoSociedades:Sociedad[];
  cols=3;
  rowHeight = '650px';



  reporteRiesgoCliente?:ReporteRiesgoCliente;
  reporteMorosidad?:ReporteMorosidad;
  listadoEmpresaSolicitud: Empresa[];
  listadoRiesgoCliente: RiesgoCliente;
  listadoRepresentanteLegal: RiesgoClienteRepresentanteLegal[]=[];
  constructor(
    
    private responsive: BreakpointObserver,
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
      empresa: [''],
      representante_legal: [''],
    });
  }


    displayedColumns: string[] = ['name', 'respuesta'];
    dataSource = ELEMENT_DATA;



  ngOnInit(): void {
    this.listarEmpresas();
    this.listarSociedades();

   /*  this.responsive.observe([
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



    }); */



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
      //this.formulary['sociedad'].setValue(data.payload[0].sociedad_codigo_sap);
    });
  }

  async listarReportes() {

    let item = {
      id_solicitud: this.id_solicitud,
      sociedad_codigo_sap: this.formulary.get('sociedad').value,
      id_empresa: this.formulary.get('empresa').value,
    }
    await this.listarReporteRiesgos(item);
    //await this.listarReporteMorosidad(item);
    /* console.log(`al seleccionar la sociedad -> ${JSON.stringify(event)}`); */
  }

  async listarReporteRiesgos(item: any) {
    console.log(`item reporte : ${JSON.stringify(item)}`);
    await this.reporteSustentoEvaluacionService.listarReporteRiesgos(item).then((data) => {
      console.log("listar reporte:" + JSON.stringify(data));
      this.reporteRiesgoCliente = data.payload;
      this.listadoRiesgoCliente=data.payload.reporte_riesgo_cliente[0];
      this.listadoRepresentanteLegal=data.payload.reporte_riesgo_cliente_representante_legal;
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

  
  filtrarRepresentante(){
    console.log(`Cambio de Representante`);
  }


}
