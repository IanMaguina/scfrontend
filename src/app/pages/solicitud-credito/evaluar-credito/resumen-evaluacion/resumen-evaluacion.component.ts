import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-evaluacion',
  templateUrl: './resumen-evaluacion.component.html',
  styles: [
  ]
})
export class ResumenEvaluacionComponent implements OnInit {
  @Input() id_solicitud: number;
  constructor() { }

  ngOnInit(): void {
  }

}
