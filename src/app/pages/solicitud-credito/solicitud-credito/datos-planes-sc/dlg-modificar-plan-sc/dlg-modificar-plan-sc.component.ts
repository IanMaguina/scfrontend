import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudPlanService } from './../../../../../services/solicitud-plan.service';
import { Subject } from 'rxjs';
import { TipoLinea } from 'src/app/models/tipo-linea.interface';
import { AutenticacionService } from '@services/autenticacion.service';
import { GlobalSettings } from 'src/app/shared/settings';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { LineaProductoService } from 'src/app/services/linea-producto.service';
import { PlanService } from 'src/app/services/plan.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service';
import { DocumentoValoradoService } from 'src/app/services/documento-valorado.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { takeUntil, tap } from 'rxjs/operators';
import { SolicitudPlanCondicionPagoDTO } from './../../../../../dto/solicitud-plan-condicion-pago.dto';
import { SolicitudPlanDocumentoValoradoDTO } from 'src/app/dto/solicitud-plan-documento-valorado.dto';
import { CrearSolicitudCondicionPagoComponent } from 'src/app/pages/solicitud-condicion-pago/pages/crear-solicitud-condicion-pago/crear-solicitud-condicion-pago.component';

@Component({
  selector: 'app-dlg-modificar-plan-sc',
  templateUrl: './dlg-modificar-plan-sc.component.html',
  styles: [
  ]
})
export class DlgModificarPlanScComponent implements OnInit {

  id_solicitud_plan:any;
  solicitud_plan:any;

  private grupo_cliente_codigo_sap!: string;
  private id_cliente_agrupacion!: number;
  private id_empresa!: number;
  private id_plan!: number;
  private destroy$ = new Subject<unknown>();

  displayedColumnsLineaProducto: string[] = ['codigo_sap', 'nombre'];
  //displayedColumnsLineaProducto: string[] = ['codigo_sap', 'nombre', 'valor_nuevo'];
  displayedColumnsDocumentoValorado: string[] = ['nombre', 'importe'];

  solicitudData: any;
  id_solicitud_editar: any;
  listadoTipoLinea: TipoLinea[] = [];
  listadoPlanesCredito: any[] = [];
  listadoPlanesCreditoEmpresa: any[] = [];
  listadoVigencias: any[] = [{ id: 1, nombre: "Pico de demanda" }, { id: 2, nombre: "DV en curso" }, { id: 3, nombre: "Fecha" }];
  listadoLineaProducto: any[] = [];
  listadoLineaProductoSeleccionados: any[] = [];
  listadoDocumentosValorados: any[] = [];
  listadoCondicionesPago: any[] = [];

  mostrarListadoLineaProductoGrilla: any[] = [];
  mostrarListadoDocumentoValoradoGrilla: any[] = [];

  listadoMoneda: any[] = [];

  LINEA_REGULAR = GlobalSettings.LINEA_REGULAR;
  LINEA_TEMPORAL = GlobalSettings.LINEA_TEMPORAL;

  PICO_DEMANDA = GlobalSettings.PICO_DEMANDA;
  DOCUMENTO_VALORADO_EN_CURSO = GlobalSettings.DOCUMENTO_VALORADO_EN_CURSO;
  FECHA_VIGENCIA_TEMPORAL = GlobalSettings.FECHA_VIGENCIA_TEMPORAL;
  TIPO_CLIENTE_EMPRESA_INDIVIDUAL = GlobalSettings.TIPO_CLIENTE_EMPRESA_INDIVIDUAL;
  TIPO_CLIENTE_CONSORCIO = GlobalSettings.TIPO_CLIENTE_CONSORCIO;
  formulary: FormGroup;

  formErrors = {
    'tipo_linea': '',
    'moneda': '',
    'reemplazo': '',
    'plan_credito': '',
    'importe': '',
    'vigencia': '',
    'linea_producto': '',
    'documento_valorado': '',
    'informacion_adicional': '',
  }
  validationMessages = {
    'tipo_linea': {
      'required': 'el tipo_linea es requerido.'
    },
    'moneda': {
      'required': 'el moneda es requerido.'
    },
    'reemplazo': {
      'required': 'el reemplazo es requerido.'
    },
    'plan_credito': {
      'required': 'el plan_credito es requerido.'
    },
    'importe': {
      'required': 'el importe es requerido.'
    },
    'vigencia': {
      'required': 'el vigencia es requerido.'
    },
    'linea_producto': {
      'required': 'el linea_producto es requerido.'
    },
    'documento_valorado': {
      'required': 'el documento_valorado es requerido.'
    },
    'informacion_adicional': {
      'required': 'el informacion_adicional es requerido.'
    },
  };
  submitted = false;
  carga: boolean = false;
  checkReemplazoPlan: boolean = false;
  userInfo: any;
  id_usuario: number = 0;
  id_tipo_cliente: number = 0;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudPlanService: SolicitudPlanService,
    public dialogRef: MatDialogRef<DlgModificarPlanScComponent>,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private planService: PlanService,
    private documentoValoradoService: DocumentoValoradoService,
    private lineaProductoService: LineaProductoService,
    private tipoMonedaService: TipoMonedaService,
    private matDialog: MatDialog,
  ) { 


    this.formulary = this.formBuilder.group({
      lineaProductosArray: this.formBuilder.array([]),
      tipo_linea: [''],
      moneda: [''],
      reemplazo: [''],
      empresa: [''],
      plan_credito: [''],
      importe: [''],
      vigencia: [''],
      fecha_vigencia: [''],
      linea_producto: [''],
      documento_valorado: [''],
      documentoValoradoArray: this.formBuilder.array([]),
      informacion_adicional: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })

  }

  async ngOnInit(){
     console.log( "data="+JSON.stringify(this.data));
     this.id_solicitud_plan = this.data.id;

     const s = await this.solicitudPlanService.editar(this.id_solicitud_plan);
     console.log("solicitud plan="+JSON.stringify(s));
     this.solicitud_plan = s.payload;
     this.id_solicitud_editar = s.payload.id_solicitud;
     

     this.userInfo = this.autenticacionService.getUserInfo();
     console.log("user-->" + JSON.stringify(this.userInfo));
     this.id_usuario = this.userInfo.id;     

     

    console.log(" id solicitud editar="+this.id_solicitud_editar);

    await this.listarPlanEmpresa();
    this.onChangelistarPlanEmpresa();
    this.onChangelistarLineaProducto();    
    await this.listarMoneda();
    await this.listarTipoLinea();    

    await this.loadData();
  }

  async loadData(){

    this.formulary.controls['tipo_linea'].setValue(this.solicitud_plan.tipo_linea);
    this.formulary.controls['moneda'].setValue(this.solicitud_plan.tipo_moneda);    

    const plan_empresa=this.listadoPlanesCreditoEmpresa.filter(pce=>pce.id_empresa==this.solicitud_plan.empresa.id)[0];
    if (plan_empresa) this.formulary.controls['empresa'].setValue(plan_empresa);

    await this.listarPlanxGrupoCliente(this.solicitud_plan.empresa.grupo_cliente_codigo_sap);
    
    const plan_credito = this.listadoPlanesCredito.filter(pc=>pc.id==this.solicitud_plan.plan.id)[0];

    if (plan_credito) this.formulary.controls['plan_credito'].setValue(plan_credito);

    this.formulary.controls['importe'].setValue(this.solicitud_plan.importe);    

    console.log("vigencia....."+JSON.stringify(this.solicitud_plan.tipo_vigencia));

    this.formulary.controls['vigencia'].setValue(this.solicitud_plan.tipo_vigencia); 

    this.formulary.controls['fecha_vigencia'].setValue(this.solicitud_plan.fecha_vigencia); 

    await this.listarLineaProductos(this.solicitud_plan.plan.id , this.userInfo.sociedad_codigo_sap, this.grupo_cliente_codigo_sap);

    const linea_productos = this.listadoLineaProducto.filter(lp=>{

      if (this.solicitud_plan.solicitud_plan_condicion_pago){
        const items = this.solicitud_plan.solicitud_plan_condicion_pago.find((o)=> o.id_condicion_pago?(o.id_condicion_pago == lp.id):false);
        return items!=null;
      }else return false;

    });

    console.log("linea_productos="+JSON.stringify(linea_productos));
    this.formulary.controls['linea_producto'].setValue(linea_productos);

    this.llenarLineaProductoGrilla();

    const documentos_plan = await this.documentoValoradoService.listarLineaProductoxPlan(this.solicitud_plan.plan.id);

    console.log("docs = "+JSON.stringify(documentos_plan));

    if (this.solicitud_plan.solicitud_plan_documento_valorado){

         const documentos_seleccionados = this.solicitud_plan.solicitud_plan_documento_valorado.map(o=> {
          
            console.log("o....="+JSON.stringify(o));

            const doc = documentos_plan.payload.find(d=>d.id==o.id_documento_valorado);

            console.log("doc....="+JSON.stringify(doc));

            return {id:o.id_documento_valorado,nombre:doc.nombre, importe:o.importe};

         });

         console.log("dvs="+JSON.stringify(documentos_seleccionados));

         console.log("documentos_seleccionados="+JSON.stringify(documentos_seleccionados));
         this.formulary.controls['documento_valorado'].setValue(documentos_seleccionados);

         this.mostrarListadoDocumentoValoradoGrilla = documentos_seleccionados;
         this.formulary.setControl('documentoValoradoArray', this.mapearDocumentoValorado(documentos_seleccionados));

    }    

    this.formulary.controls['informacion_adicional'].setValue(this.solicitud_plan.comentario);

  }

  comparaObjectos(obj1:any,obj2:any):Boolean{    

    //console.log("obj1="+JSON.stringify(obj1));
    //console.log("obj2="+JSON.stringify(obj2));

    if (obj1==null || obj2==null) return obj1==obj2;

    return obj1.id === obj2.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  async listarPlanxGrupoCliente(grupo_cliente_codigo_sap: any) {
    await this.planService.listarPlanxGrupoCliente(grupo_cliente_codigo_sap).then(data => {
      this.listadoPlanesCredito = data.payload;
    })
  }

  async listarTipoLinea() {
    await this.solicitudPlanService.listarTipoLinea(this.id_solicitud_editar).then(data => {
      this.listadoTipoLinea = data.payload;
    })
  }

  async listarPlanEmpresa() {
    await this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(async ({ payload }) => {
      console.log("listarPlanEmpresa--->" + JSON.stringify(payload));
      this.listadoPlanesCreditoEmpresa = payload.filter(item => item.empresa.sociedad_codigo_sap == this.userInfo.sociedad.sociedad_codigo_sap);

      if (this.listadoPlanesCreditoEmpresa[0].solicitud.id_tipo_cliente === this.TIPO_CLIENTE_EMPRESA_INDIVIDUAL) {
        this.id_tipo_cliente = this.TIPO_CLIENTE_EMPRESA_INDIVIDUAL;
        this.formulary.get('empresa').setValue(this.listadoPlanesCreditoEmpresa[0]);
        await this.listarPlanxGrupoCliente(this.listadoPlanesCreditoEmpresa[0].empresa.grupo_cliente_codigo_sap);
      }
    })
  }

  get documentoValoradoArray(): FormArray {
    return this.formulary.get('documentoValoradoArray') as FormArray;
  }

  validarImporte(element: any) {
    let suma = 0;
    this.documentoValoradoArray.controls.forEach((i) => {
      suma = suma + i.get('importe').value;
      if (suma > this.formulary.get('importe').value) {
        const dialogRef2 = this.matDialog.open(ErrorDialogComponent, {
          disableClose: true,
          width: "400px",
          data: "Revisar Importes"
        });
        /* en realidad no habria return, pero por si acaso, borrar si es necesario */
        dialogRef2.afterClosed().subscribe(result => {
        });

      }
    })
  }

  get lineaProductosArray(): FormArray {
    return this.formulary.get('lineaProductosArray') as FormArray;
  }

  cargarPlanes(form: any) {
    console.log(form.empresa);

  }

  private onChangelistarPlanEmpresa() {
    this.formulary.get('empresa')?.valueChanges.pipe(
      tap((data) => {
        console.log("data....."+JSON.stringify(data));
        if (data) {
          console.log("listado-->" + JSON.stringify(data))

          this.lineaProductosArray.controls = [];

          const { id_cliente_agrupacion, id_empresa,
            solicitud: { sociedad_codigo_sap },
            cliente_agrupacion: { grupo_cliente_codigo_sap } } = data;

          this.grupo_cliente_codigo_sap = data.empresa.grupo_cliente_codigo_sap;
          this.id_cliente_agrupacion = id_cliente_agrupacion;
          this.id_empresa = id_empresa;
          //this.formulary.controls.linea_producto.enable();
          this.listarPlanxGrupoCliente(data.empresa.grupo_cliente_codigo_sap);
          //this.listarLineaProductos(this.userInfo.sociedad_codigo_sap, data.empresa.grupo_cliente_codigo_sap)
          return;
        }

        //this.formulary.controls.linea_producto.disable();

      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private onChangelistarLineaProducto() {
    this.formulary.get('plan_credito')?.valueChanges.pipe(
      tap((data) => {
        console.log("hhhh--->" + JSON.stringify(data));
        console.log("sociedad cod sap--->" + this.userInfo.sociedad_codigo_sap);
        console.log("cliente cod sap--->" + this.grupo_cliente_codigo_sap);
        this.id_plan = data.id;
        this.listarLineaProductos(data.id, this.userInfo.sociedad_codigo_sap, this.grupo_cliente_codigo_sap)
        this.listarDocumentosValorados();
        //this.formulary.controls.linea_producto.disable();

      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  async listarLineaProductos(id: number, sociedad: string, grupo_cliente: string) {
    await this.lineaProductoService.listarCondicionPagoxPlan(id, sociedad, grupo_cliente)
      .then((data) => {
        this.listadoLineaProducto = data.payload;
        console.log("YYYYY--->" + JSON.stringify(data))
      });
  }

  async mapeoLineaProducto(data: SolicitudPlanCondicionPagoDTO) {
    let solicitudPlanCondicionPago: SolicitudPlanCondicionPagoDTO = {
      id_solicitud_plan: data.id_solicitud_plan,
      id_condicion_pago: data.id_condicion_pago,
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

  /* comienza Doc valorado */
  listarDocumentosValorados() {
    this.documentoValoradoService.listarLineaProductoxPlan(this.id_plan).then(data => {
      this.listadoDocumentosValorados = data.payload;
    })
  }

  async mapeoDocumentoValorado(data: SolicitudPlanDocumentoValoradoDTO) {
    let solicitudPlanDocumentovalorado: SolicitudPlanDocumentoValoradoDTO = {
      id: data.id,
      id_solicitud_plan: data.id_solicitud_plan,
      nombre: data.nombre,
      id_documento_valorado: data.id_documento_valorado,
      importe: data.importe,
      porcentaje: data.porcentaje

    }
    return solicitudPlanDocumentovalorado;
  }

  llenarDocumentoValoradoGrilla() {
    let documentoValorado = this.formulary.get("documento_valorado").value;
    console.log("cbo DV data -->" + JSON.stringify(documentoValorado));
    this.mostrarListadoDocumentoValoradoGrilla = documentoValorado;
    this.formulary.setControl('documentoValoradoArray', this.mapearDocumentoValorado(documentoValorado));
    if (this.documentoValoradoArray.controls.length === 1) {
      this.documentoValoradoArray.controls[0].get('importe').setValue(this.formulary.get("importe").value);
    }
  }

  mapearDocumentoValorado(lista: SolicitudPlanDocumentoValoradoDTO[]): FormArray {
    const valor = lista.map((SolicitudPlanDocumentoValoradoDTO.asFormGroup));
    return new FormArray(valor);
  }

  async listarMoneda() {
    this.tipoMonedaService.listar().then(data => {
      this.listadoMoneda = data.payload;
    })
  }

  seteoTipoLinea() {
    let valor = this.formulary.get("tipo_linea").value;
    console.log(JSON.stringify(valor));
  }

  private destructuringAssigment(form) {

    const { lineaProductosArray, documentoValoradoArray } = this.formulary.value;

    const params = {
      "id_solicitud": this.id_solicitud_editar,
      "id_tipo_linea": form.tipo_linea.id,
      "id_plan": form.plan_credito.id,
      "grupo_cliente_codigo_sap": this.grupo_cliente_codigo_sap,
      "id_cliente_agrupacion": this.id_cliente_agrupacion,
      "id_empresa": this.id_empresa,
      "id_tipo_vigencia": form.vigencia.id,
      "fecha_vigencia": (form.fecha_vigencia===''?null:form.fecha_vigencia),
      "id_tipo_moneda": form.moneda.id,
      "importe": form.importe,
      "fecha_inicio": null,
      "fecha_fin": null,
      "comentario": form.informacion_adicional,
      "id_plan_referencia": null,
      "tipo_calculo": null,
      "condicion_pago": lineaProductosArray,
      "documento_valorado": documentoValoradoArray
    }

    return params;
  }

  solicitarNuevaCondicionPago() {
    let data = {
      arrayProductos: this.formulary.get('lineaProductosArray'),
      id_solicitud: this.id_solicitud_editar
    }

    const dialogRef = this.matDialog.open(CrearSolicitudCondicionPagoComponent, {
      disableClose: true,
      width: "750px",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {

        console.log("se agregó el plan correctamente");
      }
    });

  }

  async actualizar(form){
    const params = this.destructuringAssigment(form);
    this.solicitudPlanService.actualizar(this.id_solicitud_plan, params).then(data => {
      if (data.header.exito) {
        this.onNoClick('CONFIRM_DLG_YES');
      }
    })
  }

  onNoClick(res: string) {
    this.dialogRef.close(res);
  }

}
