import { Component, OnInit } from '@angular/core';
import { GarantiaLiquida } from 'src/app/models/garantia-liquida.interface';

@Component({
  selector: 'app-garantia-liquida-sc',
  templateUrl: './garantia-liquida-sc.component.html',
  styles: [
  ]
})
export class GarantiaLiquidaScComponent implements OnInit {
  listadoGarantiaLiquida:GarantiaLiquida[]=[];
  displayedColumns:string[]=[
    'sociedad_codigo_sap',
    'numero_documento_valorado',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'moneda_actual',
    'tipo_linea',
    'vigencia',
    'documento_valorado_actual',
  ];


  constructor() { }
  ngOnInit(): void {}


}
