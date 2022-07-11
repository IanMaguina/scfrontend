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
  miClienteSolicitud : any;
  userInfo:any;
  solicitud:Solicitud;
  ESTADO_SOLICITUD:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE:number=GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION:number=GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  listadoRiesgos:SolicitudPlan[]=[];
  listadoHipotecas:SolicitudPlan[]=[];

  esGrupo:boolean=false;
  esConsorcio:boolean=false;
  esEmpresa:boolean=false;

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
        this.listarPlanSolicitudHipoteca();
      }
    });
  }

  mapeoAgrupacion(clienteSolicitud: any) {
    
    if(clienteSolicitud.id_cliente_agrupacion && clienteSolicitud.numero_documento_cliente_agrupacion!='' ){
      //es consorcio
      this.esConsorcio = true;
      let cliente_solicitud: any = {
        nombre: clienteSolicitud.id_cliente_agrupacion?clienteSolicitud.nombre_cliente_agrupacion : '',
        documento: clienteSolicitud.id_cliente_agrupacion?clienteSolicitud.numero_documento_cliente_agrupacion : '',
      }
      return cliente_solicitud;
    }else if(clienteSolicitud.id_cliente_agrupacion && clienteSolicitud.numero_documento_cliente_agrupacion==''){
      //es grupo
      this.esGrupo = true;
      let cliente_solicitud: any = {
        nombre: clienteSolicitud.id_cliente_agrupacion?clienteSolicitud.nombre_cliente_agrupacion : '',
        documento: '',
      }
      return cliente_solicitud;
    }else if(clienteSolicitud.id_cliente_agrupacion == null){
      this.esEmpresa = true;
      let cliente_solicitud: any = {
        nombre: clienteSolicitud.empresa?clienteSolicitud.empresa.razon_social:'',
        documento: clienteSolicitud.empresa?clienteSolicitud.empresa.numero_documento:'',
      }
      return cliente_solicitud;
    } 
   
  }

  async listarPlan() {
    if(this.id_solicitud_editar){
    this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(data => {

      console.log("Header Empresas Solicitud: "+JSON.stringify(data));
      this.miClienteSolicitud = this.mapeoAgrupacion(data.payload[0]);
            
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

  listarPlanSolicitudHipoteca(){
    if(this.id_solicitud_editar){
    this.planService.listarPlanSolicitudHipoteca(this.id_solicitud_editar).then(data=>{
      this.listadoHipotecas = data.payload;
      console.log("listado Plan Riesgo"+ JSON.stringify(data.payload));
    })
  }
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
  

}
