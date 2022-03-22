import { Injectable } from '@angular/core';
import { AsistenteFacturacion } from '../models/asistente-facturacion.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenteFacturacionService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarAsistentesFacturacion(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/asistente-facturacion").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay asistentes de facturación encontrados...");
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

  crearAsistenteFacturacion(asistenteFacturacion: AsistenteFacturacion): Promise<any> {
    console.log("sending asistente Facturacion..." + JSON.stringify(asistenteFacturacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/asistente-facturacion", asistenteFacturacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

 

  activarDesactivarAsistenteFacturacion(asistenteFacturacion: AsistenteFacturacion): Promise<any> {
    console.log("sending asistente-facturacion..." + JSON.stringify(asistenteFacturacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/asistente-facturacion/" + asistenteFacturacion.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }


}
