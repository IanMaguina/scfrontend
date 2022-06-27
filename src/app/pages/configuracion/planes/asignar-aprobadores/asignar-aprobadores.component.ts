import { AprobadorDocumentovalorado } from './../../../../models/aprobador-documentovalorado';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { moveItemInArray } from '@angular/cdk/drag-drop/';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';

import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/models/plan.interface';
@Component({
  selector: 'app-asignar-aprobadores',
  templateUrl: './asignar-aprobadores.component.html',
  styleUrls: ['./asignar-aprobadores.component.css']
})
export class AsignarAprobadoresComponent implements OnInit {
  @Input() plan: Plan;
  listadoAprobadoresPlan:any[]=[];
  listadoAuxAprobadoresPlan:any[]=[];

  filteredUsuarioAprobador!: Observable<Usuario[]>;
  comboListadoUsuarioAprobador: Usuario[] = [];
  selectedUsuarioAprobador: any;
  aprobadorForm:FormGroup;
  formErrors = {
    'usuario': '',
  }
  validationMessages = {
    'usuario': {
      'required': 'el correo es requerido.',
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  id_plan_documentovalorado:any;

  constructor(
    public dialogRef: MatDialogRef<AsignarAprobadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private planService: PlanService
    ) { 
      this.id_plan_documentovalorado = data;
      console.log("id_plan_documentovalorado--->"+data);
      this.aprobadorForm = this.formBuilder.group({
        usuario: ['', Validators.required],
      })
      this.aprobadorForm.valueChanges.subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.aprobadorForm, this.formErrors, this.validationMessages, this.submitted);
      })

    }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarAprobadoresporDocumentoValorado();
  }

  async listarAprobadoresporDocumentoValorado() {
    this.planService.listarAprobadoresporDocumentoValorado(this.id_plan_documentovalorado).then(data => {
      this.listadoAprobadoresPlan = data.payload;
      this.listadoAuxAprobadoresPlan= data.payload;
      console.log("listadoAprobadoresPlan-->"+JSON.stringify(this.listadoAprobadoresPlan));
    })
  }

  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    console.log("listadoUsuarios-->"+JSON.stringify(listado));
    this.comboListadoUsuarioAprobador = listado.payload;
    this.filteredUsuarioAprobador = this.aprobadorForm.get('usuario')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterAprobador(nombre) : this.comboListadoUsuarioAprobador.slice())
      );
  }

  private _filterAprobador(nombre: string): Usuario[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoUsuarioAprobador.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  async asignarAprobador(form:any){
    console.log("asignarAprobador-->"+JSON.stringify(form));
    let aprobador = await this.mapeoAprobador(form)
    this.planService.asignarAprobador(aprobador).then(()=>{
      this.listarAprobadoresporDocumentoValorado();
    })
  }

  async mapeoAprobador(form:any) {
    let orden=this.listadoAprobadoresPlan.length+1;
    let aprobador: AprobadorDocumentovalorado = {
      id_plan_documentovalorado: this.id_plan_documentovalorado,
      id_tipo_aprobador:1,
      id_usuario:form.usuario.id,
      orden:orden
    }
    return aprobador;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listadoAprobadoresPlan, event.previousIndex, event.currentIndex);
    //console.log("como se ve-->"+JSON.stringify(this.listadoAprobadoresPlan));
    console.log(JSON.stringify(this.mapeoAprobadores()));
    this.planService.actualizarOrden(this.id_plan_documentovalorado, this.mapeoAprobadores()).then(()=>{
      this.listarAprobadoresporDocumentoValorado();
    });
  }

  displayFn(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  mapeoAprobadores(){
    let conta=0;
    let listado:any[]=this.listadoAprobadoresPlan;
    let aprobadores:any[]=[];
    listado.forEach(item=>{
      conta++;
      aprobadores.push({id:item.id,orden:conta})
    })
    return ({aprobadores:aprobadores});
  }
}
