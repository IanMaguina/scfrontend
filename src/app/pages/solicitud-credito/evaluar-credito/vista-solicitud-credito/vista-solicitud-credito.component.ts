import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-solicitud-credito',
  templateUrl: './vista-solicitud-credito.component.html',
  styles: [
  ]
})
export class VistaSolicitudCreditoComponent implements OnInit {
  @Input() id_solicitud: number;
  constructor() { }

  ngOnInit(): void {
  }

}
