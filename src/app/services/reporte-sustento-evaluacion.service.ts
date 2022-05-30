import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteSustentoEvaluacionService {

  constructor(private resourceService: ResourceService) { }

  listarReporteRiesgos(item: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-riesgo-cliente?id_solicitud=" + item.id_solicitud + "&sociedad_codigo_sap=" + item.sociedad_codigo_sap + "&id_empresa=" + item.id_empresa).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("datos riesgo no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );

      }
    );
  }

  listarReporteMorosidad(item: any): Promise<any> {
    console.log("this item morosidad" + JSON.stringify(item));
    return new Promise(
      (resolve, reject) => {
         this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-bi?id_solicitud="+item.id_solicitud+"&sociedad_codigo_sap="+item.sociedad_codigo_sap+"&id_empresa="+item.id_empresa).toPromise().then((data) => {
        /* this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-bi?id_solicitud=1").toPromise().then((data) => { */
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("datos de morosidad no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }




  listarReportePoderJudicial(item: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-poder-judicial?id_solicitud=" + item.id_solicitud + "&sociedad_codigo_sap=" + item.sociedad_codigo_sap + "&id_empresa=" + item.id_empresa).toPromise().then((data) => {
        /* this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-poder-judicial?id_solicitud=1").toPromise().then((data) => { */
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("datos de poder judicial no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );

      }
    );

  }










}
