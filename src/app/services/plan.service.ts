import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Plan } from '../models/plan.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarPlan(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay documento valorado encontrados...");
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

  editarPlan(id_plan: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan/" + id_plan).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos planes encontrado...");
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

  crearPlan(plan: Plan): Promise<any> {
    console.log("adding plan..." + JSON.stringify(plan));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/plan", plan).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarPlan(plan: Plan): Promise<any> {
    console.log("sending plan..." + JSON.stringify(plan));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/plan/" + plan.id, plan).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarPlan(plan: Plan): Promise<any> {
    console.log("sending plan..." + JSON.stringify(plan));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/plan/" + plan.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  guardarInformacion(plan: Plan): Promise<any> {
    console.log("adding plan informacion..." + JSON.stringify(plan));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/plan/"+plan.id+"/guardar-informacion", plan).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  guardarCruce(plan: Plan): Promise<any> {
    console.log("adding plan cruce..." + JSON.stringify(plan));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/plan/"+plan.id+"/guardar-cruce", plan).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }  

  editarCruce(id_plan: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan/" + id_plan+"/listar-cruce").toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos planes encontrado...");
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

  editarInformacion(id_plan: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan/" + id_plan+"/listar-informacion").toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos planes encontrado...");
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

  listarPlanDocumentoValoradoAprobador(id:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan/"+id+"/documento-valorado-aprobador").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay documento valorado encontrados...");
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

  listarAprobadoresporDocumentoValorado(id_plan_documentovalorado:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan-documento-valorado/"+id_plan_documentovalorado+"/aprobador").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay documento valorado encontrados...");
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

  actualizarOrden(id_plan_documentovalorado:number,aprobadores: any): Promise<any> {
    console.log("sending aprobadores..." + JSON.stringify(aprobadores));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/plan-documento-valorado-aprobador/"+id_plan_documentovalorado+"/actualizar-orden", aprobadores).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }
  
   
}


