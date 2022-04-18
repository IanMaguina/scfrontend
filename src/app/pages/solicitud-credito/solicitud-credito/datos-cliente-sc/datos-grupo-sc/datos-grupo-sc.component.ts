import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-grupo-sc',
  templateUrl: './datos-grupo-sc.component.html',
  styles: [
  ]
})
export class DatosGrupoScComponent implements OnInit {
  listaEmpresas:any =[
    { 
      id: 1,
      id_grupo: 1,
      codigo_cliente_sap: '65165',
      canal_comercial: 'Canal 1',
      oficina_venta: 'oficina 1',
      razon_social: 'empresa 1 SAC',
      grupo_cliente: 'Grupo 1',
      correo: 'empresa1@gmail.com',
    },
    { 
      id: 2,
      id_grupo: 1,
      codigo_cliente_sap: '65166',
      canal_comercial: 'Canal 2',
      oficina_venta: 'oficina 2',
      razon_social: 'empresa 2 SAC',
      grupo_cliente: 'Grupo 2',
      correo: 'empresa2@gmail.com',
    },
    { 
      id: 3,
      id_grupo: 1,
      codigo_cliente_sap: '65167',
      canal_comercial: 'Canal 3',
      oficina_venta: 'oficina 3',
      razon_social: 'empresa 3 SAC',
      grupo_cliente: 'Grupo 3',
      correo: 'empresa3@gmail.com',
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
