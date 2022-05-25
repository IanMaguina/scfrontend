import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private resourceService: ResourceService
  ) { }
  listarPerfiles(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/perfil").toPromise().then((data) => {
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
