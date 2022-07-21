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
  
  listarEstrategiaFiltros(filtros:any): Promise<any> {
    let id_usuario = null;
    let id_rol = null;
    let sociedad_codigo_sap = null;
    let grupo_cliente_codigo_sap = null;
    let query = "";
    if (filtros['id_rol']) {
      id_rol = filtros['id_rol'];
      query = "id_rol=" + id_rol;

    }
    if (filtros['id_usuario']) {
      id_usuario = filtros['id_usuario'];
      query = query != "" ? "&id_usuario=" + id_usuario : "id_usuario=" + id_usuario;
    }
    if (filtros['sociedad_codigo_sap']) {
      sociedad_codigo_sap = filtros['sociedad_codigo_sap'];
      query = query != "" ? "&sociedad_codigo_sap=" + sociedad_codigo_sap : "sociedad_codigo_sap=" + sociedad_codigo_sap;
    }

    if (filtros['grupo_cliente_codigo_sap']) {
      grupo_cliente_codigo_sap = filtros['grupo_cliente_codigo_sap'];
      query = query != "" ? "&grupo_cliente_codigo_sap=" + grupo_cliente_codigo_sap : "grupo_cliente_codigo_sap=" + grupo_cliente_codigo_sap;
    }

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/rol-usuario?"+query).toPromise().then((data) => {
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
