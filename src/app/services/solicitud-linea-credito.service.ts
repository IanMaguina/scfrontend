import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudLineaCreditoService {

  constructor(private resourceService: ResourceService) { }

  public enviarRevision(id_solicitud: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource(`/api/solicitud/${id_solicitud}/enviar-a-revision`, null).toPromise()
          .then((data) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          });

      });
  }
}
