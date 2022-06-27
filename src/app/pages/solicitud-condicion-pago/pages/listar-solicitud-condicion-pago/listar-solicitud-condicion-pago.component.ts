import { Component, OnInit } from '@angular/core';
import { CondicionPago } from 'src/app/models/condicion_pago.interface';

@Component({
  selector: 'app-listar-solicitud-condicion-pago',
  templateUrl: './listar-solicitud-condicion-pago.component.html',
  styles: [
  ]
})
export class ListarSolicitudCondicionPagoComponent implements OnInit {
  displayedColumns:string[]=[
    'sociedad',
    'grupo_cliente',
    'linea_producto',
    'valor',
  ]
  listadoCondicionPago:CondicionPago[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  editarCondicionPago(element:any){

  }

}
