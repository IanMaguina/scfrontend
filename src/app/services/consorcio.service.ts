import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { ClienteAgrupacion } from '../models/cliente-agrupacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsorcioService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarConsorcios(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion?id_tipo_cliente=2").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay consorcios encontrados...");
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

  crearConsorcio(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending Consorcio..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion", clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarConsorcio(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/cliente-agrupacion/" + clienteAgrupacion.id, clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarConsorcio(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending clienteAgrupacion..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/cliente-agrupacion/" + clienteAgrupacion.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  aprobarConsorcio(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending Consorcio..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteAgrupacion.id+"/aprobar",clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  rechazarConsorcio(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending Consorcio..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteAgrupacion.id+"/rechazar",clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }




}
