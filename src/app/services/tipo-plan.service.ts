import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
@Injectable({
  providedIn: 'root'
})
export class TipoPlanService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarTipoPlanes(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/tipo-plan-credito").toPromise().then((data) => {
          if (data.exito) {
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

}
