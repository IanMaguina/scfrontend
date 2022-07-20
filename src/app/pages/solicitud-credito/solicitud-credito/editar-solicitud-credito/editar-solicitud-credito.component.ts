import { GlobalSettings } from 'src/app/shared/settings';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { SolicitudService } from '@services/solicitud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SeguimientoSolicitudCreditoComponent } from '../seguimiento-solicitud-credito/seguimiento-solicitud-credito.component';
import { SnackBarService } from '@services/snack-bar.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

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
    private matDialog: MatDialog,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private solicitudService: SolicitudService,
    private _snack: SnackBarService,

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
    this.solicitudService.aprobar(this.id_solicitud_editar, { id_usuario: this.userInfo.id }).then(data=>{
      console.log("resultado-->"+JSON.stringify(data));
      if (data.payload){
        let data = {
          mensaje : "Su solicitud ha sido enviada a RPA con éxito !!!",
        }
        this.openDialog(SuccessDialogComponent,"se envió la solicitud a RPA!", data);
      }else{
        let mensaje : "Ocurrió un error durante el envio a RPA !"; 
        this.openDialog(ErrorDialogComponent,"se envió la solicitud a RPA!", mensaje);
      }
    });
  }

  rechazar() {
    let v = { id_usuario: this.userInfo.id };
    console.log(this.id_solicitud_editar + "----" + JSON.stringify(v));
    this.solicitudService.rechazar(this.id_solicitud_editar, { id_usuario: this.userInfo.id }).then(data=>{
      console.log("resultado-->"+JSON.stringify(data));
      if (data.payload){
        let data = {
          mensaje : "Su solicitud ha sido rechazada correctamente",
        }
        this.openDialog(SuccessDialogComponent,"se rechazó la solicitud correctamente", data);
      }else{
        let mensaje : "Ocurrió un error durante el rechazo !"; 
        this.openDialog(ErrorDialogComponent,"no se rechazó la solicitud", mensaje);
      }
    });
  }
  
  openDialog(componente: any, msg_exito: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true, 
      data: data?data:''
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(msg_exito);
      this.router.navigate(['app/solicitudcredito/bandejaMisPendientes']);
    });
  }

  abrirSeguimiento(){
    this.matDialog.open(SeguimientoSolicitudCreditoComponent, {
      disableClose: true, 
      data: this.id_solicitud_editar,
      panelClass: "config_Seguimiento"
    }); 
  }

  anularSolicitud(){
    let data= {
      mensaje: 'Está seguro de anular la Solicitud?'
    }
    let dialogRef1 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true, 
      data: data
    });

    dialogRef1.afterClosed().subscribe(res => {
      if(res === 'CONFIRM_DLG_YES'){
        this.solicitudService.eliminarSolicitud(this.id_solicitud_editar).then((data)=>{
          if(data.header.exito){
            this._snack.openSnackBar(`Se anuló la solicitud: ${this.id_solicitud_editar}`,'Cerrar');
            this.router.navigate(['app/solicitudcredito/bandejaMisPendientes']);
          }
        })
      }
      
    });


    
  }

}