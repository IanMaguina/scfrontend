import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { ClienteEmpresa } from '../models/cliente-empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteEmpresaService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarEmpresas(id_cliente_agrupacion:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/"+id_cliente_agrupacion+"/empresa").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay empresas encontrados...");
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
  
  crearClienteEmpresa(clienteEmpresa: ClienteEmpresa): Promise<any> {
    console.log("sending clienteEmpresa..." + JSON.stringify(clienteEmpresa));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteEmpresa.id_cliente_agrupacion+"/empresa", clienteEmpresa).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarClienteEmpresa(id_cliente_agrupacion: number,id_cliente_empresa:number, usuario_modificacion:any): Promise<any> {
    console.log("/api/cliente-agrupacion2/" + id_cliente_agrupacion+"/empresa/"+id_cliente_empresa);
    let item ={
      "usuario_modificacion":usuario_modificacion
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource3("/api/cliente-agrupacion2/" + id_cliente_agrupacion+"/empresa/"+id_cliente_empresa, item).toPromise().then((data) => {
            resolve(data);
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
