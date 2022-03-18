import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maximo-linea-credito',
  templateUrl: './maximo-linea-credito.component.html',
  styles: [
  ]
})
export class MaximoLineaCreditoComponent implements OnInit {


  listadoImporteMaximo: any[] = [
    {grupocliente:"zafiro", morosidad:"A", importemax:"90%"},
    {grupocliente:"zafiro", morosidad:"B", importemax:"50%"},
    {grupocliente:"zafiro", morosidad:"C", importemax:"20%"},
    {grupocliente:"zafiro", morosidad:"D", importemax:"0%"},
 
  ];
  displayedColumns: string[] = ['grupocliente', 'morosidad', 'importemax'];

  constructor() {
    console.log("constructor");
   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  openEditarImporte(){
    console.log("openEditarImporte");
  }
}
