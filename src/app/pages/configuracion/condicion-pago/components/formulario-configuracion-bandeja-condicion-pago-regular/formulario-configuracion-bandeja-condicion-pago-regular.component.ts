import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CondicionPagoRegularService } from '@services/condicion-pago-regular.service';

@Component({
  selector: 'app-formulario-configuracion-bandeja-condicion-pago-regular',
  templateUrl: './formulario-configuracion-bandeja-condicion-pago-regular.component.html',
  styleUrls: ['./formulario-configuracion-bandeja-condicion-pago-regular.component.css']
})
export class FormularioConfiguracionBandejaCondicionPagoRegularComponent implements OnInit {

  public formularioConfiguracionCondicionPagoRegular: FormGroup;
  public sociedad$:Observable<any>;
  public grupoCLiente$:Observable<any>;
  public lineaProducto$:Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly condicionPagoRegularService:CondicionPagoRegularService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSociedad();
    this.getGrupoCLiente();
    this.getLineaProducto();
  }

  private initForm() {
    this.formularioConfiguracionCondicionPagoRegular = this.formBuilder.group({
      sociedad: [''],
      grupo_cliente: [''],
      linea_producto: ['']
    });
  }

  private getSociedad(){ 
    this.sociedad$ = this.condicionPagoRegularService.getSociedad();
  }

  private getGrupoCLiente(){ 
    this.grupoCLiente$ = this.condicionPagoRegularService.getGrupoCliente();
  }

  private getLineaProducto(){
    this.lineaProducto$ = this.condicionPagoRegularService.getLineaProducto();
  }

  public onBuscarCondicionPagoRegular() {

    const { sociedad, grupo_cliente , linea_producto} = this.formularioConfiguracionCondicionPagoRegular.value;

    let params = new HttpParams()

    if (sociedad) {
      params = params.set('sociedad', sociedad);
    }

    if (grupo_cliente) {
      params = params.set('grupo_cliente', grupo_cliente);
    }

    if (linea_producto) {
      params = params.set('linea_producto', linea_producto);
    }

    this.formularioConfiguracionCondicionPagoRegular.reset();
    this.condicionPagoRegularService.eventBuscarCondicionPagoRegular(params);
  }
}
