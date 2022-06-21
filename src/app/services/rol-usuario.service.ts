import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolUsuario } from '../models/rol-usuario.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  constructor(
    private resourceService: ResourceService
  ) { }

  crearEstrategiaRolUsuario(rolUsuario: RolUsuario): Promise<any> {
    console.log("sending Usuario..." + JSON.stringify(rolUsuario));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/rol-usuario", rolUsuario).toPromise().then((data) => {
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }


  listarEstrategiaRolUsuario(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rol-usuario").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("Registros no encontrados...");
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

  editarEstrategiaRolUsuario(rolUsuario: RolUsuario): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/rol-usuario/" + rolUsuario.id, rolUsuario).toPromise().then((data) => {
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

  editarEstrategiaRolUsuario2(rolUsuario: RolUsuario): Observable<any> {
    return this.resourceService.putResource("/api/rol-usuario/" + rolUsuario.id, rolUsuario);
  }

  listarRoles(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rol").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("Registros no encontrados...");
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
  listarEstrategiaRolUsuarioxUsuario(id_usuario:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rol-usuario?id_usuario="+id_usuario).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("Registros no encontrados...");
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
