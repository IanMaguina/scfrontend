import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { DocumentoValorado } from '../models/documento-valorado.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentoValoradoService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarDocumentosValorados(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/documento-valorado").toPromise().then((data) => {
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
        this.resourceService.getResource("/api/documento-valorado/" + id_documentovalorado).toPromise().then((data) => {
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

  crearDocumentoValorado(documentoValorado: DocumentoValorado): Promise<any> {
    console.log("adding documentoValorado..." + JSON.stringify(documentoValorado));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/documento-valorado", documentoValorado).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarDocumentoValorado(documentoValorado: DocumentoValorado): Promise<any> {
    console.log("sending actualizarDocumentoValorado..." + JSON.stringify(documentoValorado));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/documento-valorado/" + documentoValorado.id, documentoValorado).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }
  activarDocumentoValorado(documentoValorado: DocumentoValorado): Promise<any> {
    console.log("sending activarDocumentoValorado..." + JSON.stringify(documentoValorado));
    let item = {
      activo:documentoValorado.activo
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/documento-valorado/" + documentoValorado.id+"/actualizar-activo",item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  eliminarDocumentoValorado(documentoValorado: DocumentoValorado): Promise<any> {
    console.log("sending eliminarDocumentoValorado..." + JSON.stringify(documentoValorado));

    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/documento-valorado/" + documentoValorado.id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  listarLineaProductoxPlan(id_plan:any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/plan/documento-valorado?id_plan="+id_plan).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay planes encontrados...");
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


