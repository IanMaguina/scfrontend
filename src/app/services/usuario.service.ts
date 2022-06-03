import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarUsuarios(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/usuario").toPromise().then((data) => {
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

  listarUsuarioPorFiltros(filtros: any): Promise<any> {

    let dataJson = {};
    let id_perfil = null;
    let nombre = null;
    let sociedad_codigo_sap = null;
    let correo = null;
    let query = "";
    if (filtros['id_perfil']) {
      id_perfil = filtros['id_perfil'];
      query = "id_perfil=" + id_perfil;

    }
    if (filtros['nombre']) {
      nombre = filtros['nombre'];
      query = query != "" ? "&nombre=" + nombre : "nombre=" + nombre;
    }
    if (filtros['sociedad_codigo_sap']) {
      sociedad_codigo_sap = filtros['sociedad_codigo_sap'];
      query = query != "" ? "&sociedad_codigo_sap=" + sociedad_codigo_sap : "sociedad_codigo_sap=" + sociedad_codigo_sap;
    }

    if (filtros['correo']) {
      correo = filtros['correo'];
      query = query != "" ? "&correo=" + correo : "correo=" + correo;
    }

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/usuario?" + query).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
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

  editarUsuario(email: any): Promise<any> {
    let datosUsuario: any;
    return new Promise(
      (resolve, reject) => {

        this.resourceService.getResource("/usuario/buscarDatosDeEstrategiaDeUsuario?correo=" + email).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            datosUsuario = data;
            resolve(datosUsuario);
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

  crearUsuario(usuario: Usuario): Promise<any> {
    console.log("sending Usuario..." + JSON.stringify(usuario));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/usuario", usuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarUsuario(usuario: Usuario): Promise<any> {
    let respuesta: UserResponse;
    console.log("sending Usuario..." + JSON.stringify(usuario));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/usuario/" + usuario.id, usuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }


  /* Funciona como eliminar usuario ya que es "delete" */
  activarUsuario(usuario: Usuario): Promise<any> {
    console.log("activar/desactivar Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    let item = {
      activo:usuario.activo
    }
    return new Promise(
      (resolve, reject) => {

        this.resourceService.putResource("/api/usuario/" + usuario.id+"/actualizar-activo",item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
  eliminarUsuario(usuario: Usuario): Promise<any> {


    console.log("activar/desactivar Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    return new Promise(
      (resolve, reject) => {

        this.resourceService.deleteResource2("/api/usuario/" + usuario.id).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
  //post service asign supervisor
  asignarSupervisor(item: any): Promise<any> {

    console.log("supervisor data" + JSON.stringify(item));
    let respuesta: UserResponse;
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/estrategia/asignarUsuarioSupervisor", item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }


  desasignarSupervisor(item: any): Promise<any> {

    console.log("desasignar supervisor..." + JSON.stringify(item));
    let respuesta: UserResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/estrategia/eliminarSupervisor/", item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }


  getSupervisoresPorUsuario(item: any): Promise<any> {
    let datosSupervisor: any;
    let idUsuario: string = item.idUsuario;
    let idEstrategiaRol: string = item.idEstrategiaRol;
    return new Promise(
      (resolve, reject) => {

        this.resourceService.getResource("/estrategia/listarUsuarioSupervisor?idUsuario=" + idUsuario + "&idEstrategiaRol=" + idEstrategiaRol).toPromise().then((data) => {
          if (data.resultado == 1 && Object.keys(data.supervisores).length !== 0) {
            datosSupervisor = data.supervisores;
            resolve(datosSupervisor);
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
  getSupervisoresNoAsignados(idUsuario: any, idEstrategiaRol: any): Promise<any> {
    let datosSupervisor: any;

    return new Promise(
      (resolve, reject) => {

        this.resourceService.getResource("/estrategia/listarSupervisores?idUsuario=" + idUsuario + "&idEstrategiaRol=" + idEstrategiaRol).toPromise().then((data) => {
          if (data.resultado == 1 && Object.keys(data.supervisores).length !== 0) {
            datosSupervisor = data.supervisores;
            resolve(datosSupervisor);
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

  getUsuarioPorCorreo(email: any): Promise<any> {
    let datosUsuario: any;
    return new Promise(
      (resolve, reject) => {

        this.resourceService.getResource("/usuario/buscarDatosDeEstrategiaDeUsuario?correo=" + email).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            datosUsuario = data;
            resolve(datosUsuario);
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




}



export interface UserResponse {
  resultado: number;
  mensaje: string;
  id?: number;
  lista?: Usuario[];
}
