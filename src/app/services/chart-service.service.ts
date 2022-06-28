import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(
    private resourceService: ResourceService
  ) { }


  chartFacturacion(filtros:any): Promise<any> {



    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/api/sap-cliente/reporte-facturacion-fechas",filtros).toPromise().then((data) => {
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

}
