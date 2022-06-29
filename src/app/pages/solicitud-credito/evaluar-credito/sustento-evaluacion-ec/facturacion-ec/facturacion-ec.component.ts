import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from '@services/chart-service.service';


@Component({
  selector: 'app-facturacion-ec',
  templateUrl: './facturacion-ec.component.html',
  styles: [
  ]
})
export class FacturacionEcComponent implements OnInit {
  
  filtro:any = {
    
      "id_solicitud": 1111,
      "numero_documento": 888888,
      "sociedad_codigo_sap": 6012,
      "tipo": "mes",
      "start_date": 202001,
      "end_date": 202111
  
  }
 data = [ {
  "name":"Facturación",
  "series":[{
    "name": "Facturacióm",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  },]
}];
  

  
  view: [number,number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Años';
  yAxisLabel: string = 'Montos';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor(
    private chartService: ChartServiceService,

  ) { }

  ngOnInit(): void {
   // Object.assign(this, { multi });
    this.mostrarGrafico();
  }
  mostrarGrafico(){
    this.chartService.chartFacturacion(this.filtro).then(data => {
      console.log("fact: "+JSON.stringify(data));
     // this.data[0].series=data.payload;
    });
  }
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
