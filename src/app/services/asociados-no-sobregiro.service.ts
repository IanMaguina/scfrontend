import { Injectable } from '@angular/core';
import { AsociadoNoSobregiro } from '../models/asociado-no-sobregiro.interface';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class AsociadosNoSobregiroService {

  constructor(private resourceService: ResourceService) { }




  listarAsociadosNoSobregiro(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/asociado-no-sobregiro").toPromise().then((data) => {
          if (data.header.exito) {
            console.log("listarUsuariosNoAgregados--->" + JSON.stringify(data));
            resolve(data);
          } else {
            console.log("no hay asosciados encontrados...");
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

  crearAsociadoNoSobregiro(asociadoNoSobregiro: AsociadoNoSobregiro): Promise<any> {
    console.log("sending asociado-no-sobregiro..." + JSON.stringify(asociadoNoSobregiro));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/asociado-no-sobregiro", asociadoNoSobregiro).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarAsociadoNoSobregiro(id_asociado: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/asociado-no-sobregiro/" + id_asociado).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay Asociado encontrado...");
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
