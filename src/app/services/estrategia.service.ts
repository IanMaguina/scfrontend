import { Injectable } from '@angular/core';
import { EstadoRolUsuarioAsignado } from '../models/estado-rol-usuario-asignado.interface';
import { EstadoRolUsuario } from '../models/estado-rol-usuario.interface';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class EstrategiaService {

  constructor(private resourceService: ResourceService) { 
    
  }

  listarEstrategias(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/estrategia").toPromise().then((data) => {
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

  listarUsuariosNoAgregados(id_estado_rol:number): Promise<any> {
    console.log("enviando id_estado_rol-->"+id_estado_rol);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/estrategia/listar-usuarios-no-agregados?id_estado_rol="+id_estado_rol).toPromise().then((data) => {
          if (data.header.exito) {
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

  crearEstrategia(estadoRolUsuario: EstadoRolUsuario): Promise<any> {
    console.log("sending Usuario..." + JSON.stringify(estadoRolUsuario));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/estrategia", estadoRolUsuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  editarEstrategia(id: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/estrategia/" + id).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
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


  crearRevisor(id_estado_rol_usuario:number,estadoRolUsuarioAsignado: EstadoRolUsuarioAsignado): Promise<any> {
    console.log("sending estadoRolUsuarioAsignado..." + JSON.stringify(estadoRolUsuarioAsignado));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/estrategia/"+id_estado_rol_usuario+"/agregar-revisor", estadoRolUsuarioAsignado).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarEstrategia(id_estado_rol_usuario:number,estadoRolUsuario: EstadoRolUsuario): Promise<any> {
    console.log("enviando-->"+id_estado_rol_usuario+"-----"+JSON.stringify(estadoRolUsuario))
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/estrategia/"+id_estado_rol_usuario, estadoRolUsuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
  inactivarEstrategia(estrategia:any): Promise<any> {
    console.log("enviando-->"+estrategia+"-----");
    let item ={
      activo:estrategia.activo
    };
    
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/estrategia/"+estrategia.id+"/actualizar-activo",item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
  eliminarEstrategia(id_estado_rol_usuario:number): Promise<any> {
    console.log("enviando-->"+id_estado_rol_usuario+"-----");
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/estrategia/"+id_estado_rol_usuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

}
