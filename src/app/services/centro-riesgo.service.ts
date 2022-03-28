import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class CentroRiesgoService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listar(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/centro-riesgo").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no se encontrados datos...");
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


