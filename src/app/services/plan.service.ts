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

  editarPlan(id_documentovalorado: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan/" + id_documentovalorado).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos DV encontrado...");
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

}


