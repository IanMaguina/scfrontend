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
  displayedColumns:string[]=[
    'sociedad_codigo_sap',
    'numero_documento_valorado',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'moneda_actual',
    'vigencia',
    'documento_valorado_actual',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
