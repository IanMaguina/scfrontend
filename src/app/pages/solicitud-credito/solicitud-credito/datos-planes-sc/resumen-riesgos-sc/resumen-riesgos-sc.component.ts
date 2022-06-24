import { Component, OnInit } from '@angular/core';
import { ResumenRiesgo } from 'src/app/models/resumen-riesgo.interface';

@Component({
  selector: 'app-resumen-riesgos-sc',
  templateUrl: './resumen-riesgos-sc.component.html',
  styles: [
  ]
})
export class ResumenRiesgosScComponent implements OnInit {
  listadoResumenDino: ResumenRiesgo[] = [];
  listadoResumenDisac: ResumenRiesgo[] = [];
  listadoResumenTotalPacasmayo: ResumenRiesgo[] = [];
  displayedColumns1: string[] = [
    'sociedad_codigo_sap',
    'numero_documento_valorado',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'moneda_actual',
    'vigencia',
    'documento_valorado_actual',
  ];
  displayedColumns2: string[] = [
    'total_categoria',
    'linea_credito_actual_convertida',
    'linea_credito_solicitada_convertida',
    'variacion',
    'linea_credito_solicitada_convertida_dino',
    'linea_credito_solicitada_convertida_disac',
  ];

  constructor() { }

  ngOnInit(): void {
    this.listarResumenDino();
    this.listarResumenDisac();
    this.listarResumenTotalGrupoPacasmayo();
  }
  listarResumenDino() {
    this.listadoResumenDino = [
      {
        id: 1,
        is_total: false,
        total_header_nombre: 'Riesgo regular',
        elemento: [
          {
            nombre: 'Riesgo regular',
            linea_credito_actual: '20000.00',
            moneda_actual: 'SOL',
            moneda_solicitada: 'SOL',
            linea_credito_actual_convertida: '20000.00',
            linea_credito_solicitada: '20000.00',
            linea_credito_solicitada_convertida: '20000.00',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 2,
        is_total: false,
        total_header_nombre: 'Riesgo temporal',
        elemento: [
          {
            nombre: 'Riesgo temporal',
            linea_credito_actual: '-',
            moneda_actual: '-',
            moneda_solicitada: '-',
            linea_credito_actual_convertida: '-',
            linea_credito_solicitada: '-',
            linea_credito_solicitada_convertida: '-',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 3,
        is_total: true,
        total_header_nombre: 'Total Riesgo',
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '20000.00',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '20000.00',
      },
      {
        id: 4,
        is_total: false,
        total_header_nombre: 'Garantia Liquida',
        elemento: [
          {
            nombre: 'Garantia Liquida',
            linea_credito_actual: '50000.00',
            moneda_actual: 'SOL',
            moneda_solicitada: 'SOL',
            linea_credito_actual_convertida: '50000.00',
            linea_credito_solicitada: '50000.00',
            linea_credito_solicitada_convertida: '50000.00',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 5,
        is_total: false,
        total_header_nombre: 'Garantia Liquida',
        elemento: [
          {
            nombre: 'Garantia Liquida',
            linea_credito_actual: '25000.00',
            moneda_actual: 'USD',
            moneda_solicitada: 'USD',
            linea_credito_actual_convertida: '97500.00',
            linea_credito_solicitada: '25000.00',
            linea_credito_solicitada_convertida: '97500.00',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 6,
        is_total: true,
        total_header_nombre: 'Total Garantia Liquida',
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '147500.00',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '147500.00',
      },
    ]
  }
  listarResumenDisac() {
    this.listadoResumenDisac = [
      {
        id: 1,
        is_total: false,
        total_header_nombre: 'Riesgo regular',
        elemento: [
          {
            nombre: 'Riesgo regular',
            linea_credito_actual: '20000.00',
            moneda_actual: 'SOL',
            moneda_solicitada: 'SOL',
            linea_credito_actual_convertida: '20000.00',
            linea_credito_solicitada: '20000.00',
            linea_credito_solicitada_convertida: '20000.00',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 2,
        is_total: false,
        total_header_nombre: 'Riesgo temporal',
        elemento: [
          {
            nombre: 'Riesgo temporal',
            linea_credito_actual: '-',
            moneda_actual: '-',
            moneda_solicitada: '-',
            linea_credito_actual_convertida: '-',
            linea_credito_solicitada: '-',
            linea_credito_solicitada_convertida: '-',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 3,
        is_total: true,
        total_header_nombre: 'Total Riesgo',
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '20000.00',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '20000.00',
      },
      {
        id: 4,
        is_total: false,
        total_header_nombre: 'Garantia Liquida',
        elemento: [
          {
            nombre: 'Garantia Liquida',
            linea_credito_actual: '50000.00',
            moneda_actual: 'SOL',
            moneda_solicitada: 'SOL',
            linea_credito_actual_convertida: '50000.00',
            linea_credito_solicitada: '50000.00',
            linea_credito_solicitada_convertida: '50000.00',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 5,
        is_total: false,
        total_header_nombre: 'Garantia Liquida',
        elemento: [
          {
            nombre: 'Garantia Liquida',
            linea_credito_actual: '25000.00',
            moneda_actual: 'USD',
            moneda_solicitada: 'USD',
            linea_credito_actual_convertida: '97500.00',
            linea_credito_solicitada: '25000.00',
            linea_credito_solicitada_convertida: '97500.00',
          }
        ],
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '-',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '-',
      },
      {
        id: 6,
        is_total: true,
        total_header_nombre: 'Total Garantia Liquida',
        linea_credito_actual: '-',
        linea_credito_actual_convertida: '147500.00',
        linea_credito_solicitada: '-',
        linea_credito_solicitada_convertida: '147500.00',
      },
    ]
  }

  listarResumenTotalGrupoPacasmayo() {
    this.listadoResumenTotalPacasmayo =[
    {
      id: 1,
      is_total: true,
      total_header_nombre: 'Total linea de Crédito',
      elemento: [
        {
          nombre: 'Garantia Liquida',
          linea_credito_actual: '25000.00',
          moneda_actual: 'USD',
          moneda_solicitada: 'USD',
          linea_credito_actual_convertida: '97500.00',
          linea_credito_solicitada: '25000.00',
          linea_credito_solicitada_convertida: '97500.00',
        }
      ],
      linea_credito_actual_convertida: '357500.00',
      variacion: '0%',
      linea_credito_solicitada_convertida: '357500.00',
      linea_credito_solicitada_convertida_dino: '317500.00',
      linea_credito_solicitada_convertida_disac: '317500.00',
    },
    {
      id: 2,
      is_total: true,
      total_header_nombre: 'Total linea de Crédito',
      elemento: [
        {
          nombre: 'Garantia Liquida',
          linea_credito_actual_convertida: '357500.00',
          variacion: '0%',
          linea_credito_solicitada_convertida: '357500.00',
          linea_credito_solicitada_convertida_dino: '317500.00',
          linea_credito_solicitada_convertida_disac: '317500.00',
        }
      ],
      linea_credito_actual_convertida: '357500.00',
      variacion: '0%',
      linea_credito_solicitada_convertida: '357500.00',
      linea_credito_solicitada_convertida_dino: '317500.00',
      linea_credito_solicitada_convertida_disac: '317500.00',
    },
  ]


  }


}
