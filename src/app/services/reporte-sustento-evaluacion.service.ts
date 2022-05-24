import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteSustentoEvaluacionService {

  constructor(private resourceService: ResourceService) { }

  listarReporteRiesgos(id_solicitud:string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-riesgo-cliente?id_solicitud="+id_solicitud).toPromise().then((data) => {
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
  listarReporteMorosidad(id_solicitud:string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-bi?id_solicitud="+id_solicitud).toPromise().then((data) => {
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
  listarReportePoderJudicial(id_solicitud:string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rpa-cliente/linea-credito/reporte-poder-judicial?id_solicitud="+id_solicitud).toPromise().then((data) => {
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










}
