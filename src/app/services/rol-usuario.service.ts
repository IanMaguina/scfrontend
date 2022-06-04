import { Injectable } from '@angular/core';
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
          console.log("response data=" + JSON.stringify(data));
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

  listarRoles(): Promise<any> {
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




}
