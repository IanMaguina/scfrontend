import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Rol } from '../models/rol.interface';
import { EstadoRol } from '../models/estado-rol.interface';
import { EstadoRolUsuario } from '../models/estado-rol-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarParaEstrategia(): Promise<any> {
    return new Promise(
      (resolve, reject) => {

        this.resourceService.getResource("/api/estado/listar-para-estrategia").toPromise().then((data) => {
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

  
  obtenerRolesPorEstado(id_estado: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/estado/"+id_estado+"/roles").toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          }
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }


}
