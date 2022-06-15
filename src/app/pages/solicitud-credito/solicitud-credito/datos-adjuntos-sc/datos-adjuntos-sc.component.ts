import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SolicitudLineaCreditoService } from '@services/solicitud-linea-credito.service';
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

  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    private solicitudLineaCreditoService: SolicitudLineaCreditoService
  ) {
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public enviarRevision() {
    this.solicitudLineaCreditoService.enviarRevision(this.id_solicitud_editar)
      .then(resp => {
        console.log(resp);
        let data = {
          mensaje : "Su solicitud ha sido enviada al revisor con éxito !!!",
        }
        this.openDialog(SuccessDialogComponent,"se envió a revisión", data);

      })
      .catch(function (error: HttpErrorResponse) {
        console.log(error);
      })
  }

  openDialog(componente: any, msg_exito: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true, 
      data: data?data:''
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(msg_exito);
      this.router.navigate(['app/solicitudcredito/bandejaMisPendiendes']);
    });
  }


}
