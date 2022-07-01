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

  listarClienteAgrupacionEmpresa(id_cliente_agrupacion:any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
      //  console.log("api=> /api/cliente-agrupacion-empresa?id_cliente_agrupacion="+id_cliente_agrupacion);
        this.resourceService.getResource("/api/cliente-agrupacion-empresa?id_cliente_agrupacion="+id_cliente_agrupacion).toPromise().then((data) => {
         // console.log("empresas del grupo: "+JSON.stringify(data));
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
  
  crearClienteEmpresa(clienteEmpresa: ClienteEmpresa): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion-empresa/", clienteEmpresa).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarClienteEmpresa(id_cliente_agrupacion: number,id_cliente_empresa:number, usuario_modificacion:any): Promise<any> {
    let item ={
      usuario_modificacion:usuario_modificacion,
      id_cliente_empresa:id_cliente_empresa,
      id_cliente_agrupacion:id_cliente_agrupacion,
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion-empresa/eliminar", item).toPromise().then((data) => {
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
