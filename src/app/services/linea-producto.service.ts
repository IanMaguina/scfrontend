import { Injectable } from '@angular/core';
import { lineaCondicionPago } from '../models/linea-producto.interface';
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class LineaProductoService {
  constructor(
    private resourceService: ResourceService
  ) {
  }

  listar(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/condicion-pago").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no se encontrados datos...");
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

  listarCondicionPago(sociedad_codigo_sap:string,grupo_cliente_codigo_sap:string): Promise<lineaCondicionPago[]> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource(`/api/condicion-pago?sociedad_codigo_sap=${sociedad_codigo_sap}&grupo_cliente_codigo_sap=${grupo_cliente_codigo_sap}`).toPromise().then(({ header: { exito }, payload }) => {
          if (exito) {
            const condicionPago = payload.map(function (data) {

              const { id, linea_producto: { codigo_sap, nombre } } = data;

              return {
                id_solicitud_plan: null,
                id_condicion_pago: id,
                linea_producto: codigo_sap,
                nombre,
                valor_nuevo: null,
                fecha_vigencia: null
              }
            });
            resolve(condicionPago);
          } else {
            console.log("no se encontrados datos...");
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


