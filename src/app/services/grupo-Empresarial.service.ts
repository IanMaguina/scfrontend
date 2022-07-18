import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { ClienteAgrupacion } from '../models/cliente-agrupacion.interface';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoEmpresarialService {
  userInfo:any;
  constructor(
    private resourceService: ResourceService,
    private autenticacionService: AutenticacionService
  ) {
  }

  listarGruposEmpresariales(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion?id_tipo_cliente=1&activo=true").toPromise().then((data) => {
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

  filtrarGruposEmpresariales(filtros?:any): Promise<any> {
    let numero_documento = null;
    let nombre = null;
    let query = "";
    if(filtros) {

    if (filtros['nombre']) {
      nombre = filtros['nombre'];
      query ="nombre=" + nombre ;
    }

    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = query != "" ? query+"&numero_documento=" + numero_documento : "numero_documento=" + numero_documento;
    }
  }

    const id_usuario = this.autenticacionService.getUserInfo().id;

    query = query != "" ? query+"&id_usuario=" + id_usuario : "id_usuario=" + id_usuario;

    console.log("link-->" + JSON.stringify(query));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/buscar-grupo?"+query).toPromise().then((data) => {
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

  getGrupoEmpresarial(id_grupo:any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/"+id_grupo).toPromise().then((data) => {
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
    this.userInfo = this.autenticacionService.getUserInfo();
    clienteAgrupacion.id_usuario_creacion=this.userInfo.id;
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

  actualizarGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("enviando actualizar-->"+JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/cliente-agrupacion/" + clienteAgrupacion.id, clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("enviando actualizar-->"+JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/" + clienteAgrupacion.id+"/eliminar", clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  
  solicitarAprobacionGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("enviando solicitud aprobacion GrupoEmpresarial..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteAgrupacion.id+"/solicitar-aprobacion",clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  aprobarGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending GrupoEmpresarial..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteAgrupacion.id+"/aprobar",clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  rechazarGrupoEmpresarial(clienteAgrupacion: ClienteAgrupacion): Promise<any> {
    console.log("sending GrupoEmpresarial..." + JSON.stringify(clienteAgrupacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/cliente-agrupacion/"+clienteAgrupacion.id+"/rechazar",clienteAgrupacion).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }



}
