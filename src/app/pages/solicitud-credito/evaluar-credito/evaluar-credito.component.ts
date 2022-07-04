import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';



@Component({
  selector: 'app-evaluar-credito',
  templateUrl: './evaluar-credito.component.html',
  styles: [
  ],
  providers: [{ provide: CdkStepper }]
})
export class EvaluarCreditoComponent implements OnInit {
  
id_solicitud: string;
data_solicitud: any;
id_solicitud_editar: any = 0;
userInfo: any;
solicitud: Solicitud;
ESTADO_SOLICITUD:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
ESTADO_SOLICITUD_EN_SOLICITANTE:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
ESTADO_SOLICITUD_EN_REVISION:number=GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;
  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitudService:SolicitudService,
    private autenticacionService: AutenticacionService,

    ) { 
      console.log("has llegado a la evaluación ");
      this.id_solicitud = this.activatedRoute.snapshot.params.id;

      this.id_solicitud_editar = 392;//this.activatedRoute.snapshot.params.id;

    }

  ngOnInit(): void {

    this.userInfo = this.autenticacionService.getUserInfo();
    if (this.id_solicitud_editar !== null) {
      this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(data => {
        this.solicitud = data.payload;
        this.ESTADO_SOLICITUD=this.solicitud.id_estado;
        console.log("peru qatar--->" + JSON.stringify(this.solicitud));
      })
    }    
  }

  send(_event) {
    console.log("valor del evento-->" + _event);
    this.id_solicitud_editar = _event;
  }

}
