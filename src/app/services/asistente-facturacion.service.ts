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

  listarUsuariosNoAgregados(zonal_id:any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/asistente-facturacion/"+zonal_id+"/listar-usuarios-no-agregados").toPromise().then((data) => {
          if (data.header.exito) {
            console.log("listarUsuariosNoAgregados--->"+JSON.stringify(data));
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
    let item = {
      id_zonal: asistenteFacturacion.zonal.id,
      id_usuario: asistenteFacturacion.usuario.id,
    }
    console.log("sending asistente Facturacion..." + JSON.stringify(item));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/asistente-facturacion", item).toPromise().then((data) => {
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
    
    let item = {
      activo: asistenteFacturacion.activo,
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/asistente-facturacion/" + asistenteFacturacion.id, item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }
 /*  eliminarLAsistenteFacturacion(asistenteFacturacion: AsistenteFacturacion): Promise<any> {
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
  } */


}
