import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Suplencia } from '../models/suplencia.interface';

@Injectable({
  providedIn: 'root'
})
export class SuplenciaService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarSuplencia(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/suplencia").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay Suplencia encontrados...");
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

  editarSuplencia(id_suplencia: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/suplencia/" + id_suplencia).toPromise().then((data) => {
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

  crearSuplencia(suplencia: Suplencia): Promise<any> {
    console.log("adding suplencia..." + JSON.stringify(suplencia));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/suplencia", suplencia).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarSuplencia(suplencia: Suplencia): Promise<any> {
    console.log("sending suplencia..." + JSON.stringify(suplencia));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/suplencia/" + suplencia.id, suplencia).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarSuplencia(suplencia: Suplencia): Promise<any> {
    console.log("sending suplencia..." + JSON.stringify(suplencia));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/suplencia/" + suplencia.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  actualizarActivo(suplencia: Suplencia): Promise<any> {
    console.log("sending suplencia..." + JSON.stringify(suplencia));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/suplencia/" + suplencia.id+"/actualizar-activo",suplencia).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

}


