import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-consorciados-sc',
  templateUrl: './datos-consorciados-sc.component.html',
  styles: [
  ]
})
export class DatosConsorciadosScComponent implements OnInit {
  listaConsorciados:any =[
    { 
      id: 1,
      id_consorcio: 1,
      ruc: '65165987265',
      razon_social: 'empresa 1 SAC',
      participacion: '15%'
    },
    { 
      id: 2,
      id_consorcio: 1,
      ruc: '65165987261',
      razon_social: 'empresa 2 SAC',
      participacion: '35%'
    },
    { 
      id: 3,
      id_consorcio: 1,
      ruc: '65165987267',
      razon_social: 'empresa 3 SAC',
      participacion: '50%'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
