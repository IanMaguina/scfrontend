import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Solicitud } from '../models/solicitud.interface';
import { SolicitudCliente } from '../models/solicitud-cliente.interface';
import { Observable } from 'rxjs';
import { FormArray } from '@angular/forms';
import { Obra } from '../models/obra.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private resourceService: ResourceService
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
    let query = "";
    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = "numero_documento=" + numero_documento;

    }
    if (filtros['nombre']) {
      nombre = filtros['nombre'];
      query = query != "" ? "&nombre=" + nombre : "nombre=" + nombre;
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
    let query = "";
    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = "numero_documento=" + numero_documento;

    }
    if (filtros['cliente_codigo_sap']) {
      cliente_codigo_sap = filtros['cliente_codigo_sap'];
      query = query != "" ? "&cliente_codigo_sap=" + cliente_codigo_sap : "cliente_codigo_sap=" + cliente_codigo_sap;
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
    let nombre = null;
    let query = "";
    if (filtros['numero_documento']) {
      numero_documento = filtros['numero_documento'];
      query = "numero_documento=" + numero_documento;

    }
    if (filtros['nombre']) {
      nombre = filtros['nombre'];
      query = query != "" ? "&nombre=" + nombre : "nombre=" + nombre;
    }
    console.log("link-->" + "/api/cliente-agrupacion/buscar-empresa-individual?" + query);

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/api/cliente-agrupacion/buscar-empresa-individual?" + query).toPromise().then((data) => {
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
    console.log("adding suplencia..." + JSON.stringify(solicitud));
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
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/grupo-empresarial").toPromise().then((data) => {
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
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/grupo-empresarial").toPromise().then((data) => {
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
        this.resourceService.getResource("/api/solicitud/" + filtro.id_solicitud + "/consorcio").toPromise().then((data) => {
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




}
