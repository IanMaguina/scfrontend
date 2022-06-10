import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdjuntoService {

  constructor(
    private readonly resourceService: ResourceService
  ) {
  }

  public onAddAttached(formData:FormData):Observable<any>{
    return this.resourceService.postMultipartResource('/api/adjunto', formData);
  }

  crear(archivo: File, id_solicitud: any, filename: string): Promise<any> {
    let item = new FormData();
    item.append("archivo", archivo);
    item.append("id_tabla", id_solicitud);
    item.append("informacion_adicional", filename);
    console.log("vamos a enviar el archivo con el nombre " + filename);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postMultipartResource("/api/solicitud-adjunto", item).toPromise().then((data) => {
          if (data.resultado != 0) {
            resolve(data);
          } else {
            console.log("anexo no enviado...");
            resolve({});
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

  listar(id_tabla: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud-adjunto/" + id_tabla + "/empresa").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay empresas encontrados...");
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

  eliminar(id_tabla: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/solicitud-adjunto/" + id_tabla).toPromise().then((data) => {
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



}
