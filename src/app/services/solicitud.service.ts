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

  crear(solicitud : Solicitud): Promise<any> {
    console.log("adding suplencia..." + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud", solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }


  crearSolicitudPrincipalCliente(solicitud : Solicitud): Promise<any> {
    console.log("adding SolicitudPrincipalCliente..." + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud-principal-cliente", solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarSolicitudPrincipalCliente(id : number): Promise<any> {
    console.log("deletting SolicitudPrincipalCliente..." + JSON.stringify(id));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/solicitud-principal-cliente/"+id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }  

  listarSolicitudPrincipalClientexSolicitud(id_solicitud:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
          this.resourceService.getResource("/api/solicitud-principal-cliente").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
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

}
