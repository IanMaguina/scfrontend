import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacionService } from '@services/autenticacion.service';
import { SolicitudService } from '@services/solicitud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '@services/plan.service';
import { send } from 'process';
import { EmpresaPlan } from 'src/app/models/empresa-plan.interface';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { GlobalSettings } from 'src/app/shared/settings';
import { DlgNuevoPlanScComponent } from './dlg-nuevo-plan-sc/dlg-nuevo-plan-sc.component';
import { SolicitudPlan } from 'src/app/models/solicitud-plan.interface';

@Component({
  selector: 'app-datos-planes-sc',
  templateUrl: './datos-planes-sc.component.html',
  styles: [
  ]
})

export class DatosPlanesScComponent implements OnInit {

  @Input() id_solicitud_editar: number;
  empresaPlan: EmpresaPlan[];
  miGrupo : EmpresaPlan;
  userInfo:any;
  solicitud:Solicitud;
  ESTADO_SOLICITUD:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION:number=GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  listadoRiesgos:SolicitudPlan[]=[];

  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private planService: PlanService,
    private autenticacionService: AutenticacionService,
    private solicitudService: SolicitudService,
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
  }
  ngOnInit(): void {
    if (this.id_solicitud_editar !== null) {
      this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(data => {
        this.solicitud = data.payload;
        this.ESTADO_SOLICITUD=this.solicitud.id_estado;
        console.log("peru qatar--->" + JSON.stringify(this.solicitud));
      })
    }

    this.listarPlan();
  }

  openNuevoCredito() {
    const dialogRef = this.matDialog.open(DlgNuevoPlanScComponent, {
      disableClose: true,
      width: "750px",
      data: this.id_solicitud_editar,
      panelClass: 'custom_NPC'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack("se agregó el plan correctamente");
        this.listarPlanSolicitudRiesgo();
      }
    });
  }

  mapeoAgrupacion(empresaPlan: any) {
    let empresa: EmpresaPlan = {
      nombre_cliente_agrupacion: empresaPlan.nombre_cliente_agrupacion ? empresaPlan.nombre_cliente_agrupacion : 'no registra',
      numero_documento_cliente_agrupacion: empresaPlan.numero_documento_cliente_agrupacion ? empresaPlan.numero_documento_cliente_agrupacion : 'no registra',
    }

    return empresa;
  }

  async listarPlan() {
    if(this.id_solicitud_editar){
    this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(data => {
      this.miGrupo = this.mapeoAgrupacion(data.payload[0]);
      
    });
  }

  }
  listarPlanSolicitudRiesgo(){
    if(this.id_solicitud_editar){
    this.planService.listarPlanSolicitudRiesgo(this.id_solicitud_editar).then(data=>{
      this.listadoRiesgos = data.payload;
      console.log("listado Plan Riesgo"+ JSON.stringify(data.payload));
    })
  }
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
  

}
