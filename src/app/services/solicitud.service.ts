import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Solicitud } from '../models/solicitud.interface';
import { SolicitudCliente } from '../models/solicitud-cliente.interface';
import { Obra } from '../models/obra.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private resourceService: ResourceService,
    private datepipe:DatePipe
  ) { }

  listarSolicitudes(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no perfiles encontradas...");
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

  obtenerSolicitud(id: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud/" + id).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no perfiles encontradas...");
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

  listarGrupoEmpresarialxFiltros(filtros: any): Promise<any> {
    let numero_documento = null;
    let nombre = null;
    let sociedad_codigo_sap = null;
    let query = "";
    
    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = "numero_documento=" + numero_documento;

    }
    if (filtros['nombre']) {
      nombre = filtros['nombre'];
      query = query != "" ? "&nombre=" + nombre : "nombre=" + nombre;
    }

    if (filtros['sociedad_codigo_sap']) {
      sociedad_codigo_sap = filtros['sociedad_codigo_sap'];
      query = query != "" ? "&sociedad_codigo_sap=" + sociedad_codigo_sap : "sociedad_codigo_sap=" + sociedad_codigo_sap;
    }

    console.log("link-->" + "/api/cliente-agrupacion/buscar-grupo-empresarial?" + query);

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/buscar-grupo-empresarial?" + query).toPromise().then((data) => {
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

  listarConsorcioxFiltros(filtros: any): Promise<any> {
    let numero_documento = null;
    let cliente_codigo_sap = null;
    let sociedad_codigo_sap=null;
    let query = "";
    if (filtros['sociedad_codigo_sap']) {
      sociedad_codigo_sap = filtros['sociedad_codigo_sap'];
      query ="sociedad_codigo_sap=" + sociedad_codigo_sap ;
    }

    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = query != "" ? query+"&numero_documento=" + numero_documento : "numero_documento=" + numero_documento;

    }
    if (filtros['cliente_codigo_sap']) {
      cliente_codigo_sap = filtros['cliente_codigo_sap'];
      query = query != "" ? query+"&cliente_codigo_sap=" + cliente_codigo_sap : "cliente_codigo_sap=" + cliente_codigo_sap;
    }

    
    
    console.log("link-->" + "/api/cliente-agrupacion/buscar-consorcio?" + query);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/buscar-consorcio?" + query).toPromise().then((data) => {
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

  listarEmpresaIndividualxFiltros(filtros: any): Promise<any> {
    let numero_documento = null;
    let cliente_codigo_sap = null;
    let sociedad_codigo_sap=null;
    let query = "";
    if (filtros['sociedad_codigo_sap']) {
      sociedad_codigo_sap = filtros['sociedad_codigo_sap'];
      query ="sociedad_codigo_sap=" + sociedad_codigo_sap ;
    }

    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = query != "" ? query+"&numero_documento=" + numero_documento : "numero_documento=" + numero_documento;

    }
    if (filtros['cliente_codigo_sap']) {
      cliente_codigo_sap = filtros['cliente_codigo_sap'];
      query = query != "" ? query+"&cliente_codigo_sap=" + cliente_codigo_sap : "cliente_codigo_sap=" + cliente_codigo_sap;
    }
   
/*     let params = new HttpParams()
    .set('numero_documento',filtros.numero_documento)
    .set('cliente_codigo_sap', filtros.cliente_codigo_sap)
    .set('sociedad_codigo_sap', filtros.sociedad_codigo_sap );
 */    
    console.log("link-->" + "/api/cliente-agrupacion/buscar-empresa-individual?" + query);

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/buscar-empresa-individual?"+query).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no hay usuarios encontrados...");
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

  crear(solicitud: Solicitud): Promise<any> {
    console.log("adding solicitud..." + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud", solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarSolicitud(id_solicitud, solicitud: Solicitud): Promise<any> {
    console.log("/api/solicitud/"+id_solicitud+" solicitud -->"+JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/solicitud/" + id_solicitud, solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  crearSolicitudPrincipalCliente(solicitud: Solicitud): Promise<any> {
    console.log("adding SolicitudPrincipalCliente..." + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud-principal-cliente", solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarSolicitudPrincipalCliente(id: number): Promise<any> {
    console.log("deletting SolicitudPrincipalCliente..." + JSON.stringify(id));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/solicitud-principal-cliente/" + id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  listarSolicitudPrincipalClientexSolicitud(id_solicitud: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud-principal-cliente?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no perfiles encontradas...");
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

  crearSolicitudEmpresaRelacionada(solicitud: Solicitud): Promise<any> {
    console.log("adding SolicitudEmpresaRelacionada..." + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud-empresa-relacionada", solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarSolicitudEmpresaRelacionada(id: number): Promise<any> {
    console.log("deletting SolicitudEmpresaRelacionada..." + JSON.stringify(id));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/solicitud-empresa-relacionada/" + id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  listarSolicitudEmpresaRelacionada(id_solicitud: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud-empresa-relacionada?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no perfiles encontradas...");
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


  crearSolicitudReferenciaComercial(solicitud: Solicitud): Promise<any> {
    console.log("adding SolicitudReferenciaComercial..." + JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud-referencia-comercial", solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarSolicitudReferenciaComercial(id: number): Promise<any> {
    console.log("deletting SolicitudReferenciaComercial..." + JSON.stringify(id));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/solicitud-referencia-comercial/" + id).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  listarSolicitudReferenciaComercial(id_solicitud: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud-referencia-comercial?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("nReferencia comercial no encontrada...");
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

  actualizarSolicitudCliente(solicitudCliente: SolicitudCliente): Promise<any> {
    console.log("sending-->"+JSON.stringify(solicitudCliente));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/solicitud-cliente/" + solicitudCliente.id, solicitudCliente).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }

  listarGrupoEmpresarialxSolicitud(filtro: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/cliente-agrupacion").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("Grupos no encontradas...");
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

  listarGrupoEmpresarialxSolicitud2(filtro: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/cliente-agrupacion").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("Grupos no encontrados...");
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


  listarConsorcioxSolicitud(filtro: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/cliente-agrupacion").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("Consorcios no encontrados...");
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

  listarEmpresaIndividualxSolicitud(filtro: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/empresa-individual").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("empresas no encontradas...");
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

  listarObra(codigo_obra_sap: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud-obra/" + codigo_obra_sap).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data.payload);
          } else {
            console.log("obra no encontrada...");
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
  listarSolicitudObras(id_solicitud:number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud-cliente-obra/?id_solicitud="+id_solicitud).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("obras de la solicitud no encontradas...");
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

  asignarObra(obra: Obra): Promise<any> {
    console.log("adding obra a solicitud..." + JSON.stringify(obra));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud-cliente-obra/", obra).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  eliminarSolicitudObra(id_obra_solicitud: number): Promise<any> {
    console.log("deleting obra solicitud..." + JSON.stringify(id_obra_solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.deleteResource2("/api/solicitud-cliente-obra/" + id_obra_solicitud).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarSolicitudObra(solicitud_obra: Obra): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/api/solicitud-cliente-obra/" + solicitud_obra.id, solicitud_obra).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });
      });
  }
  listarSolicitudCliente(id_solicitud:string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.getResource("/api/solicitud/"+id_solicitud+"/solicitud-principal-cliente").toPromise().then((data) => {
        this.resourceService.getResource("/api/solicitud-cliente/?id_solicitud="+id_solicitud).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("empresas del cliente en la solicitud no encontradas...");
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
/* este servicio es momentáneo */
  obtenerSolicitudDatosUrl(id: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud/id=" + id).toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("no perfiles encontradas...");
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
/* servicio filtrado */
  listarSolicitudesxFiltros(filtros: any): Promise<any> {
    
    let id_estado = null;
    let correlativo = null;
    let id_usuario = null;
    let id_tipo_cliente = null;
    let numero_documento = null;
    let fecha_creacion_ano_mes_dia = null;
    let query = "";

    if (filtros['estado']) {
      id_estado = filtros['estado'].id;
      query = query != "" ? query+"&id_estado=" + id_estado: "id_estado=" + id_estado;
    }

    if (filtros['correlativo']) {
      correlativo = filtros['correlativo'];
      query = query != "" ? query+"&correlativo=" + correlativo: "correlativo=" + correlativo;
    }

    if (filtros['tipo_cliente']) {
      id_tipo_cliente = filtros['tipo_cliente'].id;
      query = query != "" ? query+"&id_tipo_cliente=" + id_tipo_cliente: "id_tipo_cliente=" + id_tipo_cliente;
    }

    if (filtros['id_usuario']) {
      id_usuario = filtros['id_usuario'];
      query = query != "" ? query+"&id_usuario=" + id_usuario: "id_usuario=" + id_usuario;
    }

    if (filtros['fecha']) {
      const fecha_formato = this.datepipe.transform(filtros['fecha'],'yyyy-MM-dd');
      fecha_creacion_ano_mes_dia = fecha_formato;
      query = query != "" ? query+"&fecha_creacion_ano_mes_dia=" + fecha_creacion_ano_mes_dia: "fecha_creacion_ano_mes_dia=" + fecha_creacion_ano_mes_dia;
     
    }

     if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = query != "" ? query+"&numero_documento=" + numero_documento: "numero_documento=" + numero_documento;
    }


    console.log("--bandeja-->"+JSON.stringify(query));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/solicitud?" + query).toPromise().then((data) => {
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


  listarEstadosSolicitud(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/estado/solicitudes").toPromise().then((data) => {
          if (data.header.exito) {
            resolve(data);
          } else {
            console.log("estado no encontrados...");
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

  aprobar(id_solicitud: number,body:any): Promise<any> {
    console.log("aprobar solicitud..." + JSON.stringify(id_solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud/"+id_solicitud+"/aprobar",body).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  rechazar(id_solicitud: number,body:any): Promise<any> {
    console.log("rechazar solicitud..." + JSON.stringify(id_solicitud));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/api/solicitud/"+id_solicitud+"/rechazar",body).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
}
