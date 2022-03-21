import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Sociedad } from '../models/sociedad.interface';

@Injectable({
  providedIn: 'root'
})
export class SociedadService {

  constructor(
    private resourceService: ResourceService
  ) { }
  listarSociedades(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/sociedad").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data.payload);
          } else {
            console.log("no perfiles encontradas...");
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
