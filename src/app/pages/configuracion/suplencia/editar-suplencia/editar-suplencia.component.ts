import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { Suplencia } from 'src/app/models/suplencia.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SuplenciaService } from 'src/app/services/suplencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GlobalSettings } from 'src/app/shared/settings';

const ROL_SUPLENTE:number=GlobalSettings.ROL_SUPLENTE;

@Component({
  selector: 'app-editar-suplencia',
  templateUrl: './editar-suplencia.component.html',
  styles: [
  ]
})
export class EditarSuplenciaComponent implements OnInit {

  suplenciaData: Suplencia;
  editarFormDialog: FormGroup;

  formErrors = {
    'usuario': '',
    'usuario_suplente': '',
    'fecha_inicio': '',
    'fecha_fin': ''
  }
  validationMessages = {
    'usuario': {
      'required': 'el usuario es requerido.'
    },
    'usuario_suplente': {
      'required': 'el usuario_suplente es requerido.',
    },
    'fecha_inicio': {
      'required': 'la fecha_inicio es requerida.',
    },
    'fecha_fin': {
      'required': 'el fecha_fin es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  comboListadoUsuario: Usuario[] = [];
  filteredUsuario!: Observable<Usuario[]>;
  selectedUsuario: any;

  comboListadoUsuarioSuplente: RolUsuario[] = [];
  filteredUsuarioSuplente!: Observable<RolUsuario[]>;
  selectedUsuarioSuplente: any;
  errorFechaActual = "";
  errorFechaInicio = "";
  errorFechaFin = "";

  constructor(
    public dialogRef: MatDialogRef<EditarSuplenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private suplenciaService: SuplenciaService,
    private rolUsuarioService: RolUsuarioService,
  ) {
    this.suplenciaData = data;
    console.log("data suplencia--->" + JSON.stringify(data));
    this.editarFormDialog = this.formBuilder.group({
      usuario: [this.suplenciaData.usuario, Validators.required],
      usuario_suplente: [this.suplenciaData.usuario_suplente, Validators.required],
      fecha_inicio: [this.suplenciaData.fecha_inicio, Validators.required],
      fecha_fin: [this.suplenciaData.fecha_fin, Validators.required],
    })
    this.editarFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.editarFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarUsuariosSuplentes();
    this.onValueChanges();
  }

  onValueChanges(): void {
    let fechaActual = new Date();
    this.editarFormDialog.valueChanges.subscribe(val => {
      if (val.fecha_inicio < fechaActual.getTime()) {
        this.errorFechaInicio = "Error en la fecha de inicio";
      } else {
        this.errorFechaInicio = "";
      }
      if (val.fecha_fin < fechaActual.getTime()
        || val.fecha_fin < val.fecha_inicio) {
        this.errorFechaFin = "Error en la fecha Fin";
      } else {
        this.errorFechaFin = "";
      }
      console.log(val);
    })
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

  /*  auto complete*/
  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuario = listado.payload;
    this.filteredUsuario = this.editarFormDialog.get('usuario')?.valueChanges
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
  /*  */
  /*  auto complete suplente*/

  async listarUsuariosSuplentes() {
    let listadoSuplentes = await this.rolUsuarioService.listarEstrategiaFiltros({id_rol:ROL_SUPLENTE}).then();
    this.comboListadoUsuarioSuplente = listadoSuplentes.payload;
    console.log("xxxx--->"+JSON.stringify(this.comboListadoUsuarioSuplente));
    this.filteredUsuarioSuplente = this.editarFormDialog.get('usuario_suplente')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterSuplente(nombre) : this.comboListadoUsuarioSuplente.slice())
      );
  }

  displayFnSuplente(user: any): string {
    console.log("YYY--->"+JSON.stringify(user));
    return user && user.nombre ? user.nombre : '';
  }

  private _filterSuplente(nombre: any): RolUsuario[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoUsuarioSuplente.filter(option => option.usuario.nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  /*  */
  
  async editarSuplencia(form: any) {
    console.log("editarSuplencia-->" + JSON.stringify(form));
    let suplencia: Suplencia = {
      id: this.suplenciaData.id,
      id_usuario: form.usuario.id,
      id_usuario_suplente: form.usuario_suplente.id,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin
    }
    this.suplenciaService.actualizarSuplencia(suplencia).then((result) => {
      if(result.header.exito){
        this.onNoClick('CONFIRM_DLG_YES');
      }else{
        this.onNoClick('CONFIRM_DLG_NO');
      }
    })

  }
 





}
