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

  getUsuarioPorCorreo(email: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {

        this.resourceService.getResource("/usuario/buscarDatosDeEstrategiaDeUsuario?correo=" + email).toPromise().then((data) => {
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

  listarUsuarios(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/usuario").toPromise().then((data) => {
          if (data.exito) {
            resolve(data.payload);
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

  crearUsuario(usuario: Usuario): Promise<any> {
    console.log("adding Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    console.log("sending Usuario..." + JSON.stringify(usuario));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/usuario", usuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

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
        this.resourceService.postResource("/api/usuario/" + usuario.id, usuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  activarUsuario(usuario: Usuario): Promise<any> {

    console.log("activar/desactivar Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    let item = {
      "id_usuario": usuario.id,
      "activo": usuario.activo,
    }

    console.log("sending Usuario..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.deleteResource("/api/usuario/" + usuario.id, item).toPromise().then((data) => {

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





}



export interface UserResponse {
  resultado: number;
  mensaje: string;
  id?: number;
  lista?: Usuario[];
}
