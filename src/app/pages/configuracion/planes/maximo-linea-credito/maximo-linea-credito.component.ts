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
  displayedColumns: string[] = ['id', 'grupocliente', 'morosidad', 'importemax'];

  constructor() { }

  ngOnInit(): void {
  }

  openEditarImporte(){
    console.log("openEditarImporte");
  }
}
