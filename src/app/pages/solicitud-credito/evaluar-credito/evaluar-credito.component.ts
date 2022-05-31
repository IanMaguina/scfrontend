import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-evaluar-credito',
  templateUrl: './evaluar-credito.component.html',
  styles: [
  ]
})
export class EvaluarCreditoComponent implements OnInit {
id_solicitud: string;
data_solicitud: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitudService:SolicitudService
    ) { 
      console.log("has llegado a la evaluación ");
      this.id_solicitud = this.activatedRoute.snapshot.params.id;
    }

  ngOnInit(): void {
    this.solicitudService.obtenerSolicitudDatosUrl(this.id_solicitud).then(data=>{
      this.data_solicitud = data.payload;
    });
  }

}
