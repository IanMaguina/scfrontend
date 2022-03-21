import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class PlanRangoService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarPlanRango(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan-rango").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay plan-rango encontrados...");
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