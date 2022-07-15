import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { SolicitudPlan } from '../models/solicitud-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPlanService {

  constructor(
    private resourceService: ResourceService
  ) { }

  listar(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud-plan").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay planes encontrados...");
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


  crear(data: SolicitudPlan): Promise<any> {
    console.log("adding solicitud-plan..." + JSON.stringify(data));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud-plan", data).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  editar(id: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud-plan/" + id).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos solicitud plan encontrado...");
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

  actualizar(id_solicitud, solicitud: SolicitudPlan): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/solicitud-plan/" + id_solicitud, solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  listarTipoLinea(id_solicitud: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud-plan/listar-tipo-linea/solicitud/" + id_solicitud).toPromise().then((data) => {
            resolve(data);
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


  obtenerResumenRiesgos(id_solicitud: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud-plan/resumen-riesgos?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos resumen riesgos encontrado...");
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

  obtenerConsolidadoRiesgos(id_solicitud: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud-plan/consolidado-riesgos?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos resumen riesgos encontrado...");
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
