import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { TipoDocumentoValorado } from '../models/tipo-documento-valorado.interface';

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
            console.log("no hay documento valorado encontrados...");
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

  editarDocumentoValorado(id_documentovalorado: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/tipo-documento-valorado/" + id_documentovalorado).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no hay datos DV encontrado...");
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

  crearDocumentoValorado(tipoDocumentoValorado: TipoDocumentoValorado): Promise<any> {
    console.log("adding tipoDocumentoValorado..." + JSON.stringify(tipoDocumentoValorado));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/tipo-documento-valorado", tipoDocumentoValorado).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarDocumentoValorado(tipoDocumentoValorado: TipoDocumentoValorado): Promise<any> {
    console.log("sending actualizarDocumentoValorado..." + JSON.stringify(tipoDocumentoValorado));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/tipo-documento-valorado/" + tipoDocumentoValorado.id, tipoDocumentoValorado).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }
  activarDocumentoValorado(tipoDocumentoValorado: TipoDocumentoValorado): Promise<any> {
    console.log("sending activarDocumentoValorado..." + JSON.stringify(tipoDocumentoValorado));
    let item = {
      activo:tipoDocumentoValorado.activo
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/tipo-documento-valorado/" + tipoDocumentoValorado.id+"/actualizar-activo",item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarDocumentoValorado(tipoDocumentoValorado: TipoDocumentoValorado): Promise<any> {
    console.log("sending eliminarDocumentoValorado..." + JSON.stringify(tipoDocumentoValorado));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/tipo-documento-valorado/" + tipoDocumentoValorado.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

}


