import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class EstrategiaService {

  constructor(private resourceService: ResourceService) { 
    
  }

  listarUsuariosNoAgregados(id_estado_rol:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/estrategia/listar-usuarios-no-agregados?id_estado_rol="+id_estado_rol).toPromise().then((data) => {
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

}
