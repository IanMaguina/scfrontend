import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { ClienteAgrupacion } from '../models/cliente-agrupacion.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoEmpresarialService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarGruposEmpresariales(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion?id_tipo_cliente=1").toPromise().then((data) => {
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
  crearGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending Grupo Empresarial..." + JSON.stringify(clienteAgrupacion));
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

  editarGrupoEmpresarial(id_cliente_agrupacion: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/" + id_cliente_agrupacion).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos Usuario encontrado...");
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

  actualizarGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending clienteAgrupacion..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/cliente-agrupacion/borrar/" + clienteAgrupacion.id, clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
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


  listarSolicitudesGruposPendientes(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion-aprobacion/listar-agrupado?id_tipo_cliente=1").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data.payload);
          } else {
            console.log("no hay solicitudes encontradas...");
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
