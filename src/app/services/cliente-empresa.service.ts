import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { ClienteEmpresa } from '../models/cliente-empresa.interface';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteEmpresaService {
  constructor(
    private resourceService: ResourceService,
    private autenticacionService: AutenticacionService
  ) {
  }

  listarClienteAgrupacionEmpresa(id_cliente_agrupacion:any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
      //  console.log("api=> /api/cliente-agrupacion-empresa?id_cliente_agrupacion="+id_cliente_agrupacion);
        this.resourceService.getResource("/api/cliente-agrupacion/"+id_cliente_agrupacion+"/empresa?activo=true").toPromise().then((data) => {
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

  buscarClienteAgrupacionEmpresas(id_cliente_agrupacion:any): Promise<any> {
    let query = "";

    const id_usuario = this.autenticacionService.getUserInfo().id;

    query = "id_cliente_agrupacion="+id_cliente_agrupacion+"&id_usuario=" + id_usuario ;

    console.log("link-->" + JSON.stringify(query));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/"+id_cliente_agrupacion+"/empresa/buscar?"+query).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay empresas encontradas...");
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
    console.log("agregando empresa : "+JSON.stringify(clienteEmpresa));
    return new Promise(
      (resolve, reject) => {
        console.log("/api/cliente-agrupacion/"+clienteEmpresa.id_cliente_agrupacion+"/empresa/agregar , body-> "+JSON.stringify(clienteEmpresa));
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteEmpresa.id_cliente_agrupacion+"/empresa/agregar", clienteEmpresa).toPromise().then((data) => {
          console.log("crear empresa en agrupacion=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarClienteEmpresa(clienteEmpresa: ClienteEmpresa,id_usuario:number): Promise<any> {
    let item ={
      id_usuario : id_usuario
    }
    return new Promise(
      (resolve, reject) => {
        console.log("/api/cliente-agrupacion/"+clienteEmpresa.id_cliente_agrupacion+"/empresa/"+clienteEmpresa.id+"/remover"+ JSON.stringify(item));
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteEmpresa.id_cliente_agrupacion+"/empresa/"+clienteEmpresa.id+"/remover", item).toPromise().then((data) => {
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
