import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { PlanService } from '@services/plan.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { SeguimientoSolicitudCreditoComponent } from '../solicitud-credito/seguimiento-solicitud-credito/seguimiento-solicitud-credito.component';

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
  ESTADO_SOLICITUD: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;
  ESTADO_SOLICITUD_EN_EVALUACION: number = GlobalSettings.ESTADO_SOLICITUD_EN_EVALUACION;
  id_tipo_cliente?: number;
  TIPO_CLIENTE_EMPRESA_INDIVIDUAL: number = GlobalSettings.TIPO_CLIENTE_EMPRESA_INDIVIDUAL;
  TIPO_CLIENTE_GRUPO_EMPRESARIAL: number = GlobalSettings.TIPO_CLIENTE_GRUPO_EMPRESARIAL;
  TIPO_CLIENTE_CONSORCIO: number = GlobalSettings.TIPO_CLIENTE_CONSORCIO;
  miClienteSolicitud: any;
  fecha_creacion?:string;
  estado?:string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitudService: SolicitudService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private matDialog: MatDialog,
    private planService: PlanService,
    private _snack: SnackBarService,
  ) {
    console.log("has llegado a la evaluación ");
    this.id_solicitud = this.activatedRoute.snapshot.params.id;
    this.id_solicitud_editar = this.activatedRoute.snapshot.params.id;

  }

  ngOnInit(): void {

    this.userInfo = this.autenticacionService.getUserInfo();
    if (this.id_solicitud_editar !== null) {
      this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(data => {
        this.solicitud = data.payload;
        this.ESTADO_SOLICITUD = this.solicitud.id_estado;
        this.id_tipo_cliente = this.solicitud.id_tipo_cliente;
        this.fecha_creacion = (this.solicitud.fecha_creacion?this.solicitud.fecha_creacion:'');
        this.estado = (this.solicitud.estado?this.solicitud.estado.nombre:'');
        console.log("Solicitud data imm--->" + JSON.stringify(this.solicitud));

        this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(res => {
          this.miClienteSolicitud = this.mapeoAgrupacion(res.payload[0], this.id_tipo_cliente);
        });

      })
    }
  }

  send(_event) {
    console.log("valor del evento-->" + _event);
    this.id_solicitud_editar = _event;
  }

  rechazar() {
    let v = { id_usuario: this.userInfo.id };
    console.log(this.id_solicitud_editar + "----" + JSON.stringify(v));
    this.solicitudService.rechazar(this.id_solicitud_editar, { id_usuario: this.userInfo.id }).then(res => {
      console.log("resultado-->" + JSON.stringify(res));
      if (res.header.exito) {
        let data = {
          mensaje: "Su solicitud ha sido rechazada correctamente",
        }
        this.openDialog(SuccessDialogComponent, "se rechazó la solicitud correctamente", data);
      } else {
        let mensaje: "Ocurrió un error durante el rechazo !";
        this.openDialog(ErrorDialogComponent, "no se rechazó la solicitud", mensaje);
      }
    });
  }

  aprobar() {
    let v = { id_usuario: this.userInfo.id };
    console.log(this.id_solicitud_editar + "----" + JSON.stringify(v));
    this.solicitudService.aprobar(this.id_solicitud_editar, { id_usuario: this.userInfo.id }).then(res => {
      console.log("resultado-->" + JSON.stringify(res));
      if (res.header.exito) {
        let data = {
          mensaje: "Su solicitud ha sido enviada a RPA con éxito !!!",
        }
        this.openDialog(SuccessDialogComponent, "se envió la solicitud a RPA!", data);
      } else {
        let mensaje: "Ocurrió un error durante el envio a RPA !";
        this.openDialog(ErrorDialogComponent, "se envió la solicitud a RPA!", mensaje);
      }
    });
  }


  openDialog(componente: any, msg_exito: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      data: data ? data : ''
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(msg_exito);
      this.router.navigate(['app/solicitudcredito/bandejaMisPendientes']);
    });
  }

  mapeoAgrupacion(clienteSolicitud: any, id_tipo_cliente: number) {

    if (id_tipo_cliente === this.TIPO_CLIENTE_CONSORCIO) {
      let cliente_solicitud: any = {
        nombre: clienteSolicitud.id_cliente_agrupacion ? clienteSolicitud.nombre_cliente_agrupacion : '',
        documento: clienteSolicitud.id_cliente_agrupacion ? clienteSolicitud.numero_documento_cliente_agrupacion : '',
      }
      return cliente_solicitud;
    } else if (id_tipo_cliente === this.TIPO_CLIENTE_GRUPO_EMPRESARIAL) {
      let cliente_solicitud: any = {
        nombre: clienteSolicitud.id_cliente_agrupacion ? clienteSolicitud.nombre_cliente_agrupacion : '',
        documento: '',
      }
      return cliente_solicitud;
    } else if (id_tipo_cliente === this.TIPO_CLIENTE_EMPRESA_INDIVIDUAL) {

      let cliente_solicitud: any = {
        nombre: clienteSolicitud.empresa ? clienteSolicitud.empresa.razon_social : '',
        documento: clienteSolicitud.empresa ? clienteSolicitud.empresa.numero_documento : '',
      }
      return cliente_solicitud;
    }
  }

  abrirSeguimiento() {
    this.matDialog.open(SeguimientoSolicitudCreditoComponent, {
      disableClose: true,
      data: this.id_solicitud_editar,
      panelClass: "config_Seguimiento"
    });
  }

  retroceder(){
    this.router.navigate(['app/solicitudcredito/bandejaMisPendientes']);
  }




}
