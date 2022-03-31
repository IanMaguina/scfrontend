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
  styles: [
  ]
})
export class AsignarAprobadoresComponent implements OnInit {
  @Input() plan: Plan;
  listadoAprobadoresPlan:any[]=[
    {id:1, orden:1,nombre:'Mariano Melgar'},
    {id:2, orden:2,nombre:'Francisco Bolognesi'},
    {id:3, orden:3,nombre:'Tupac Amaru'},
    {id:4, orden:4,nombre:'Andres Caceres'},
  ];

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

  dataPlanes:any;

  constructor(
    public dialogRef: MatDialogRef<AsignarAprobadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private planService: PlanService
    ) { 
      this.dataPlanes = data;
      this.aprobadorForm = this.formBuilder.group({
        usuario: ['', Validators.required],
      })
      this.aprobadorForm.valueChanges.subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.aprobadorForm, this.formErrors, this.validationMessages, this.submitted);
      })

    }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  async listarPlanDocumentoValorado() {
    this.planService.listarPlanDocumentoValoradoAprobador(this.plan.id).then(data => {
      //this.listadoNivelMora = data.payload;
      //console.log("nivel mora despues-->"+JSON.stringify(this.listadoNivelMora));
    })
  }

  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioAprobador = listado;
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

  asignarAprobador(form:any){
    console.log("asignarAprobador");
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listadoAprobadoresPlan, event.previousIndex, event.currentIndex);
  }
  displayFn(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
