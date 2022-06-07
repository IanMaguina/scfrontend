import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudLineaCreditoService } from '@services/solicitud-linea-credito.service';


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
      .then(resp => console.log(resp))
      .catch(function (error: HttpErrorResponse) {
        console.log(error);
      })
  }
}
