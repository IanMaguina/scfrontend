import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluar-credito',
  templateUrl: './evaluar-credito.component.html',
  styles: [
  ]
})
export class EvaluarCreditoComponent implements OnInit {
id_solicitud: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    ) { 
      console.log("has llegado a la evaluación ");
      this.id_solicitud = this.activatedRoute.snapshot.params.id;
    }

  ngOnInit(): void {
  }

}
