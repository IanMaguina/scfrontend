import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Solicitud } from '../models/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private resourceService: ResourceService
  ) { }

  listarSolicitudes(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud").toPromise().then((data) => {
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

  listarClienteAgrupacionxNombre(nombre: string): Promise<any> {
    console.log("/api/cliente-agrupacion/1/buscar?nombre=" + nombre);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/1/buscar?nombre=" + nombre).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay usuarios encontrados...");
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
