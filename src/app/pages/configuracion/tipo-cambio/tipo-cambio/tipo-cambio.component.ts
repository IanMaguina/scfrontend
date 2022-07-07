import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '@services/autenticacion.service';
import { FormValidatorService } from '@services/form-validator.service';
import { SnackBarService } from '@services/snack-bar.service';
import { TipoCambioService } from '@services/tipo-cambio.service';
import { TipoMonedaService } from '@services/tipo-moneda.service';
import { TipoCambio } from 'src/app/models/tipo-cambio.interface';
import { TipoMoneda } from 'src/app/models/tipo-moneda.interface';

@Component({
  selector: 'app-tipo-cambio',
  templateUrl: './tipo-cambio.component.html',
  styles: [
  ]
})
export class TipoCambioComponent implements OnInit {
  listadoTipoCambio: TipoCambio[] = [];
  listadoTipoMoneda: TipoMoneda[] = [];
  displayedColumns: string[] = ['tipo_moneda', 'valor', 'usuario_modificacion'];
  userInfo: any;
  id_usuario: number;
  formulary: any;
  formErrors = {
    'valor': '',
    'tipo_moneda': '',
  }
  validationMessages = {
    'valor': {
      'required': 'valor es requerido.'
    },
    'tipo_moneda': {
      'required': 'el tipo moneda es requerido.',
    },
  };

  submitted = false;
  constructor(
    private snack: SnackBarService,
    private tipoCambioService: TipoCambioService,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private tipoMonedaService: TipoMonedaService,
    private autenticacionService: AutenticacionService,
  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario = this.userInfo.id;

    this.formulary = this.formBuilder.group({
      valor: ['', Validators.required],
      tipo_moneda: ['', Validators.required],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarTipoCambio();
    this.listarTipoMoneda();
  }

  listarTipoCambio() {
    this.tipoCambioService.listarTipoCambio().then(data => {
      this.listadoTipoCambio = data.payload;
    })
  }
  listarTipoMoneda() {
    this.tipoMonedaService.listar().then(data => {
      this.listadoTipoMoneda.push(data.payload[0]);
    })
  }

  crearTipoCambio(element: any) {
    let item:TipoCambio = {
      id_usuario: this.id_usuario,
      valor: element.valor,
      id_tipo_moneda: element.tipo_moneda.id,
    }
    this.tipoCambioService.crearTipoCambio(item).then(data => {
      if(data.header.exito){
        this.snack.openSnackBar('Se creó el tipo de cambio', 'Cerrar');
        this.listarTipoCambio();
      }else{
        this.listarTipoCambio();
      }
    })
  }

}
