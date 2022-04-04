import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { GrupoCliente } from '../models/grupo-cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarGrupoCliente(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/grupo-cliente").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no se encontrados datos...");
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

  listarClientes(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/lista-cliente").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no se encontrados datos...");
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

  editar(id: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/grupo-cliente/" + id).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos encontrado...");
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

  crear(grupoCliente: GrupoCliente): Promise<any> {
    console.log("adding grupoCliente..." + JSON.stringify(grupoCliente));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/grupo-cliente", grupoCliente).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizar(grupoCliente: GrupoCliente): Promise<any> {
    console.log("sending grupoCliente..." + JSON.stringify(grupoCliente));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/grupo-cliente/" + grupoCliente.id, grupoCliente).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminar(grupoCliente: GrupoCliente): Promise<any> {
    console.log("sending grupoCliente..." + JSON.stringify(grupoCliente));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/grupo-cliente/" + grupoCliente.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

}


