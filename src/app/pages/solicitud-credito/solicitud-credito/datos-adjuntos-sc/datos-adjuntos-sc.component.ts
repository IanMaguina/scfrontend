import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SolicitudLineaCreditoService } from '@services/solicitud-linea-credito.service';
import { SolicitudService } from '@services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { GlobalSettings } from 'src/app/shared/settings';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';


@Component({
  selector: 'app-datos-adjuntos-sc',
  templateUrl: './datos-adjuntos-sc.component.html',
  styles: [
  ]
})
export class DatosAdjuntosScComponent implements OnInit {
  @Output() onFourthFormGroup: EventEmitter<any> = new EventEmitter();
  @Input() id_solicitud_editar: number;
  fourthFormGroup: FormGroup;
  correlativo?: string = '';
  
  solicitud: Solicitud;
  ESTADO_SOLICITUD: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;


  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    private solicitudLineaCreditoService: SolicitudLineaCreditoService,
    private solicitudService: SolicitudService
  ) {
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.id_solicitud_editar !== null) {
      this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(data => {
        this.solicitud = data.payload;
        this.ESTADO_SOLICITUD = this.solicitud.id_estado;
      })
  }
}
  obtenerSolicitud() {
    this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(data => {
      this.correlativo = data.payload.correlativo;


    });
  }

  public enviarRevision() {
    this.solicitudLineaCreditoService.enviarRevision(this.id_solicitud_editar).then(resp => {
      console.log("Correlativo ian : " + resp.payload);
      let data: any;
      if (resp.header.exito) {
        this.correlativo = resp.payload.correlativo;
        data = {
          mensaje: "Su solicitud ha sido enviada al revisor con éxito!",
          detalle: `N° de Solicitud:  ${this.correlativo}`,
          adicional: '*Puedes hacerle seguimiento en tu bandeja de "Consultas"'
        }
        this.openDialog(SuccessDialogComponent, "se envió a revisión", data);
       

      } else {
        console.log('no se envió a revisión');
      }

    })
      .catch(function (error: HttpErrorResponse) {
        console.log(error);
      })
  }

  async openDialog(componente: any, msg_exito: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      data: data ? data : ''
    });

    dialogRef.afterClosed().subscribe(async _ => {
      console.log(msg_exito);
      /*  await this.router.navigate(['/']); */
      await this.router.navigate(['app/solicitudcredito/bandejaMisPendientes']);
    });
  }


}
