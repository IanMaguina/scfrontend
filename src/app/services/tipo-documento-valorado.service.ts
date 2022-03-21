import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoValoradoService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarDocumentosValorados(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/tipo-documento-valorado").toPromise().then((data) => {
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

  editarDocumentoValorado(email: any): Promise<any> {
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
    console.log("adding Usuario..." + JSON.stringify(usuario));
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
    console.log("sending Usuario..." + JSON.stringify(usuario));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/usuario/" + usuario.id, usuario).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

}


