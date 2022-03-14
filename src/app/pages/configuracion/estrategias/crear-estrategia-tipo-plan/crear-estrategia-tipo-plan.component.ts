import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoDocumentoValoradoService } from 'src/app/services/tipo-documento-valorado.service';
import { TipoPlanService } from 'src/app/services/tipo-plan.service';
import { TipoPlanCredito } from 'src/app/models/tipo-plan-credito.interface';
import { PlanRangoService } from 'src/app/services/plan-rango.service';
@Component({
  selector: 'app-crear-estrategia-tipo-plan',
  templateUrl: './crear-estrategia-tipo-plan.component.html',
  styles: [
  ]
})
export class CrearEstrategiaTipoPlanComponent implements OnInit {

  estrategiaData:any;

  crearFormDialog: any;
  formErrors = {
    'plan': '',
    'tipoplan': '',
    'usuario': '',
    'orden': ''
  }
  validationMessages = {
    'plan': {
      'required': 'el nombre es requerido.'
    },
    'tipoplan': {
      'required': 'el correo es requerido.',
    },
    'usuario': {
      'required': 'la sociedad es requerida.',
    },
    'orden': {
      'required': 'el perfil es requerido.',
    }
  };
//Submitted form
submitted = false;
carga: boolean = false;

//poner el tipado correcto => es data dummy
listadoPlanes: any[] = [
  { codigo_sap:'0011', nombre: 'plan 1'},
  { codigo_sap: '0012', nombre: 'plan 2'},
];

listadoTipoTipoFlujoAprobacion:any[]=[];

 /* poner el tipo del modelo Rol */

 listadoUsuarios: any[] = [
  { id: 1, nombre: 'rol 1'},
  { id: 2, nombre: 'rol 2'},
];

myControl = new FormControl();
filteredUsuario!: Observable<Usuario[]>;
comboListadoUsuario: Usuario[] = [];
selectedUsuario: any;

  constructor(
    public dialogRef: MatDialogRef<CrearEstrategiaTipoPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService:UsuarioService,
    private tipoDocumentoValoradoService:TipoDocumentoValoradoService,
    private tipoPlanService:TipoPlanService,
    private planRangoService:PlanRangoService
  ) { 
    this.crearFormDialog = this.formBuilder.group({
      plan: ['', Validators.required],
      tipoplan: ['', Validators.required],
      usuario: ['', Validators.required],
      orden: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarPlanes();
    this.listarUsuarios();
  }

  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuario = listado;
    console.log(JSON.stringify(listado));
    this.filteredUsuario = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this.comboListadoUsuario.slice())
      );
  }

  displayFn(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(nombre: string): Usuario[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoUsuario.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  async listarPlanes() {
    this.tipoPlanService.listarTipoPlanes().then(data => {
      this.listadoPlanes = data.payload;
    })
  }

  async filtrarFlujoAprobacion() {
    let tipoPlanCredito: TipoPlanCredito = this.crearFormDialog.get('plan').value;
    this.listadoTipoTipoFlujoAprobacion=[];
    if (tipoPlanCredito.id_tipo_flujo_aprobacion === 1){
      this.listarTipoDocumentosValorados();
    }else{
      this.listarPlanRango();
    }

  }

  async listarTipoDocumentosValorados() {
    this.tipoDocumentoValoradoService.listarDocumentosValorados().then(data => {
      this.listadoTipoTipoFlujoAprobacion = data.payload;
    })
  }

  async listarPlanRango() {
    this.planRangoService.listarPlanRango().then(data => {
      this.listadoTipoTipoFlujoAprobacion = data.payload;
    })
  }
  crearEstrategiaTipoPlan(form:any){
    /* crear la estrategia */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
