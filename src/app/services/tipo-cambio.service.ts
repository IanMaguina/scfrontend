import { Injectable } from '@angular/core';
import { TipoCambio } from '../models/tipo-cambio.interface';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {

  constructor(private resourceService: ResourceService) { }


  listarTipoCambio(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/tipo-cambio?activo=true").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay datos encontrados...");
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


  crearTipoCambio(tipoCambio: TipoCambio): Promise<any> {
    console.log("adding tipoCambio..." + JSON.stringify(tipoCambio));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/tipo-cambio", tipoCambio).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

}
