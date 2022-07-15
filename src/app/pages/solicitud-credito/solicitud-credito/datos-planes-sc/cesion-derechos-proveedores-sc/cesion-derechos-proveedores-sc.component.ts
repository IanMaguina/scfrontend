import { Component, OnInit } from '@angular/core';
import { CesionDerechosProveedores } from 'src/app/models/cesion-derechos.interface';

@Component({
  selector: 'app-cesion-derechos-proveedores-sc',
  templateUrl: './cesion-derechos-proveedores-sc.component.html',
  styles: [
  ]
})
export class CesionDerechosProveedoresScComponent implements OnInit {
  listadoCesionDerechos:CesionDerechosProveedores[]=[];
  displayedColumns:string[]=[
    'sociedad_codigo_sap',
    'plan',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'moneda_actual',
    'tipo_linea',
    'vigencia',
    'documento_valorado_actual',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
