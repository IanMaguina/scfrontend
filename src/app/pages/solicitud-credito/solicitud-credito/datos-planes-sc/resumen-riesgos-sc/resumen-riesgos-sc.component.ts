import { Component, OnInit } from '@angular/core';
import { ResumenRiesgo } from 'src/app/models/resumen-riesgo.interface';

@Component({
  selector: 'app-resumen-riesgos-sc',
  templateUrl: './resumen-riesgos-sc.component.html',
  styles: [
  ]
})
export class ResumenRiesgosScComponent implements OnInit {
  listadoResumenDino:ResumenRiesgo[]=[];
  listadoResumenDisac:ResumenRiesgo[]=[];
  listadoResumenTotalPacasmayo:ResumenRiesgo[]=[];
  displayedColumns1:string[]=[
    'sociedad_codigo_sap',
    'numero_documento_valorado',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'moneda_actual',
    'vigencia',
    'documento_valorado_actual',
  ];
  displayedColumns2:string[]=[
    'total_categoria',
    'linea_credito_actual_convertida',     
    'linea_credito_solicitada_convertida',     
    'variacion',     
    'linea_credito_solicitada_convertida_dino',     
    'linea_credito_solicitada_convertida_disac',     
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
