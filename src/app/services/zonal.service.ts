import { Injectable } from '@angular/core';
import { Zonal } from '../models/zonal.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ZonalService {

  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarZonales(): Promise<any> {
    let zonaldata:Zonal;
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/zonal").toPromise().then((data) => {
          if (data.header.exito) {
            zonaldata = data.payload;
            resolve(zonaldata);
          } else {
            console.log("no hay zonales encontrados...");
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