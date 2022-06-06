import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from '@services/form-validator.service';
import { LineaProductoService } from '@services/linea-producto.service';

@Component({
  selector: 'app-crear-solicitud-condicion-pago',
  templateUrl: './crear-solicitud-condicion-pago.component.html',
  styles: [
  ]
})
export class CrearSolicitudCondicionPagoComponent implements OnInit {

  
 
  /*  displayedColumnsLineaProducto: string[] = ['codigo_sap', 'nombre','valor_nuevo', 'fecha_vigencia'];
 
  */

  id_solicitud_editar: any;
  listadoLineaProducto: any[] = [];
  listadoLineaProductoSeleccionados: any[] = [];
  listadoCondicionesPago: any[] = [];
  mostrarListadoLineaProductoGrilla: any[] = [];
  formulary: FormGroup;

  formErrors = {
    'linea_producto': '',
  }
  validationMessages = {
    'linea_producto': {
      'required': 'linea_producto es requerido.'
    },

  };
  submitted = false;
  carga: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearSolicitudCondicionPagoComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private lineaProductoService: LineaProductoService,

  ) {
    console.log("IMM data ref lineas producto-->" + JSON.stringify(this.id_solicitud_editar));
    this.id_solicitud_editar = data.id_solicitud;
    this.formulary = this.formBuilder.group({
      // lineaProductosArray: data.arrayProductos, 
      linea_producto: [''],

    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    //this.listarLineaProductos(); 
  }



  //Inicio
  /* listarLineaProductos() {
    this.lineaProductoService.listar().then(data => {
      this.listadoLineaProducto = data.payload;
    })
  }

  async mapeoLineaProducto(data: SolicitudPlanCondicionPagoDTO) {
    let solicitudPlanCondicionPago: SolicitudPlanCondicionPagoDTO = {
      id: data.id,
      id_solicitud_plan: data.id_solicitud_plan,
      id_condicion_pago_linea_producto: data.id_condicion_pago_linea_producto,
      valor: data.valor,
      valor_nuevo: data.valor_nuevo,
      fecha_vigencia: data.fecha_vigencia,
      linea_producto: data.linea_producto

    }
    return solicitudPlanCondicionPago;
  }

  llenarLineaProductoGrilla() {
    let lineaProducto = this.formulary.get("linea_producto").value;
    console.log("ARSA-->" + JSON.stringify(lineaProducto));
    this.mostrarListadoLineaProductoGrilla = lineaProducto;
    this.formulary.setControl('lineaProductosArray', this.mapearLineaProducto(lineaProducto));
  }

  mapearLineaProducto(lista: SolicitudPlanCondicionPagoDTO[]): FormArray {
    const valor = lista.map((SolicitudPlanCondicionPagoDTO.asFormGroup));
    return new FormArray(valor);
  }

  get lineaProductosArray(): FormArray {
    return this.formulary.get('lineaProductosArray') as FormArray;
  } */

  //fin





  async agregar(form: any) {
    console.log("solicitud condición de pago-->" + JSON.stringify(form));
  }



  onNoClick(res: string) {
    this.dialogRef.close(res);
  }


}
