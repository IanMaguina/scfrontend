import { Component, Input, OnInit } from '@angular/core';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';

@Component({
  selector: 'app-datos-consorciados-sc',
  templateUrl: './datos-consorciados-sc.component.html',
  styles: [
  ]
})
export class DatosConsorciadosScComponent implements OnInit {
  @Input() clienteData: ClienteDatos;
  @Input() id_solicitud: number;

  listaConsorciados:any =[];

  constructor() { }

  ngOnInit(): void {
  }

}
