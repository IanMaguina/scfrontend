import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listarEmpresas(id_cliente_agrupacion:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/"+id_cliente_agrupacion+"/empresa").toPromise().then((data) => {
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
  
  buscarEmpresa(sociedad_codigo_sap:string, numero_documento:string): Promise<any> {
    console.log("enviando data--->"+"/api/empresa/consulta?numero_documento="+numero_documento+"&sociedad_codigo_sap="+sociedad_codigo_sap);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/empresa/consulta?numero_documento="+numero_documento+"&sociedad_codigo_sap="+sociedad_codigo_sap).toPromise().then((data) => {
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
  
}
