import { Empresa } from './../../../../../models/empresa.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datos-grupo-sc',
  templateUrl: './datos-grupo-sc.component.html',
  styles: [
  ]
})
export class DatosGrupoScComponent implements OnInit {
  @Input() clienteData: Empresa[];
  listaEmpresas:any =[];
  constructor() { 
    
  }

  ngOnInit(): void {
    console.log("data de GRUPO-->"+JSON.stringify(this.clienteData));
    this.listaEmpresas=this.clienteData;
  }

}
