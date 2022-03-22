import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Suplencia } from 'src/app/models/suplencia.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SuplenciaService } from 'src/app/services/suplencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-suplencia',
  templateUrl: './crear-suplencia.component.html',
  styles: [
  ]
})
export class CrearSuplenciaComponent implements OnInit {

  
  
  crearFormDialog: FormGroup;
  
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

  comboListadoUsuarioSuplente: Usuario[] = [];
  filteredUsuarioSuplente!: Observable<Usuario[]>;
  selectedUsuarioSuplente: any;
  
  
  constructor(
    public dialogRef: MatDialogRef<CrearSuplenciaComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private suplenciaService:SuplenciaService
  ) {

    this.crearFormDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
      usuario_suplente: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarUsuariosSuplentes();
  }



  async crearSuplencia(form: Suplencia) {
    console.log("crearSuplencia-->"+JSON.stringify(form));
    let suplencia:Suplencia={
      id_usuario:form.usuario.id,
      id_usuario_suplente:form.usuario_suplente.id,
      fecha_inicio:form.fecha_inicio,
      fecha_fin:form.fecha_fin
    }
    this.suplenciaService.crearSuplencia(suplencia).then(()=>{
      this.onNoClick();    
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  /*  auto complete*/
  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuario = listado;
    this.filteredUsuario = this.crearFormDialog.get('usuario')?.valueChanges
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
    let listadoSuplentes = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioSuplente = listadoSuplentes;
    this.filteredUsuarioSuplente = this.crearFormDialog.get('usuario_suplente')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterSuplente(nombre) : this.comboListadoUsuario.slice())
      );
  }

  displayFnSuplente(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filterSuplente(nombre: string): Usuario[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoUsuario.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  /*  */







}
