import { Injectable } from '@angular/core';
import { AprobadorAdicional } from '../models/aprobador-adicional.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class AprobadorAdicionalService {

  constructor(private resourceService: ResourceService
    ) {
    }
  
    listarAprobadoresAdicionales(): Promise<any> {
      return new Promise(
        (resolve, reject) => {
          this.resourceService.getResource("/api/aprobador-adicional").toPromise().then((data) => {
            if (data.header.exito) {
              resolve(data);
            } else {
              console.log("no hay aprobadores adicionales encontrados...");
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
  
    listarUsuariosNoAgregados(): Promise<any> {
      return new Promise(
        (resolve, reject) => {
          this.resourceService.getResource("/api/aprobador-adicional/listar-usuarios-no-agregados").toPromise().then((data) => {
            if (data.header.exito) {
              console.log("listarUsuariosNoAgregados--->" + JSON.stringify(data));
              resolve(data);
            } else {
              console.log("no hay aprobadores adicionales encontrados...");
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
  
    crearAprobadorAdicional(aprobadorAdicional: AprobadorAdicional): Promise<any> {
      let item = {
        id_usuario: aprobadorAdicional.usuario.id,
      }
      console.log("sending aprobador adicional..." + JSON.stringify(item));
      return new Promise(
        (resolve, reject) => {
          this.resourceService.postResource("/api/aprobador-adicional", item).toPromise().then((data) => {
            console.log("response data=" + JSON.stringify(data));
            resolve(data);
          }).catch((error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          });
  
        });
    }
  
  
  
    activarDesactivarAprobadorAdicional(aprobadorAdicional: AprobadorAdicional): Promise<any> {
  
      let item = {
        activo: aprobadorAdicional.activo,
      }
      console.log("make item..." + JSON.stringify(item));
      return new Promise(
        (resolve, reject) => {
          this.resourceService.putResource("/api/aprobador-adicional/" + aprobadorAdicional.id + "/actualizar-activo", item).toPromise().then((data) => {
            console.log("response data=" + JSON.stringify(data));
            resolve(data);
          }).catch((error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          });
        });
    }
 
  }
  