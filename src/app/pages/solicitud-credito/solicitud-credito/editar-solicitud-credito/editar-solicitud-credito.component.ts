import { GlobalSettings } from 'src/app/shared/settings';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { SolicitudService } from '@services/solicitud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';

@Component({
  selector: 'app-editar-solicitud-credito',
  templateUrl: './editar-solicitud-credito.component.html',
  styles: [
  ]
})
export class EditarSolicitudCreditoComponent implements OnInit {


  /* datos cliente */
  firstForm: FormGroup;
  /* datos planes */
  secondForm: FormGroup;
  /* datos obras */
  thirdForm: FormGroup;
  /* datos adjuntos */
  fourthForm: FormGroup;
  id_solicitud_editar: any = 0;
  solicitud: Solicitud;
  userInfo: any;
  ESTADO_SOLICITUD:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION:number=GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitudService: SolicitudService,
    private autenticacionService: AutenticacionService
  ) {
    console.log(this.activatedRoute.snapshot.params.id)
    this.id_solicitud_editar = this.activatedRoute.snapshot.params.id;
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


  onFirstFormGroupEvent(_event) {
    this.firstForm = _event;
  }
  onSecondFormGroupEvent(_event) {
    this.secondForm = _event;
  }
  onThirdFormGroupEvent(_event) {
    this.thirdForm = _event;
  }
  onFourthFormGroupEvent(_event) {
    this.fourthForm = _event;
  }

  send(_event) {
    console.log("valor del evento-->" + _event);
    this.id_solicitud_editar = _event;
  }

  aprobar() {
    let v = { id_usuario: this.userInfo.id };
    console.log(this.id_solicitud_editar + "----" + JSON.stringify(v));
    //this.solicitudService.aprobar(this.id_solicitud_editar, { id_usuario: this.userInfo.id }).then();
  }
}