import { EstrategiaService } from './../../../../services/estrategia.service';
import { EstadoService } from './../../../../services/estado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoRol } from 'src/app/models/estado-rol.interface';
import { Estado } from 'src/app/models/estado.interface';
import { Rol } from 'src/app/models/rol.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-crear-estrategia-sociedad',
  templateUrl: './crear-estrategia-sociedad.component.html',
  styles: ['./crear-estrategia-sociedad.component.css']
})
export class CrearEstrategiaSociedadComponent implements OnInit {

  estrategiaData: any;

  crearFormDialog: any;
  formErrors = {
    'usuario': '',
    'estado': '',
    'rol': '',
    'revisor': ''
  }
  validationMessages = {
    'usuario': {
      'required': 'el correo es requerido.',
    },
    'estado': {
      'required': 'el estado es requerida.',
    },
    'rol': {
      'required': 'la sociedad es requerida.',
    },
    'revisor': {
      'required': 'el perfil es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  //poner el tipado correcto => es data dummy
  listadoSociedades: Sociedad[] = [
    { codigo_sap: '0011', nombre: 'sociedad 1' },
    { codigo_sap: '0012', nombre: 'sociedad 2' },
  ];
  /* poner el tipo del modelo Rol */

  listadoRoles: Rol[] = [
    { id: 1, nombre: 'rol 1' },
    { id: 2, nombre: 'rol 2' },
  ];

  listadoEstados: Estado[] = [
    { id: 1, nombre: 'Estado 1' },
    { id: 2, nombre: 'Estado 2' },
  ];

  myControl = new FormControl();
  filteredUsuario!: Observable<Usuario[]>;
  comboListadoUsuario: Usuario[] = [];
  selectedUsuario: any;

  myControlRevisor = new FormControl();
  filteredUsuarioRevisor!: Observable<Usuario[]>;
  comboListadoUsuarioRevisor: Usuario[] = [];
  selectedUsuarioRevisor: any;

  constructor(
    public dialogRef: MatDialogRef<CrearEstrategiaSociedadComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
    private estrategiaService: EstrategiaService
  ) {
    this.crearFormDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
      estado: ['', Validators.required],
      rol: ['', Validators.required],
      revisor: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarEstados();
    this.listarUsuariosNoAgregados();
    this.listarUsuarios();
  }

  async listarUsuariosNoAgregados() {
    let listado = await this.estrategiaService.listarUsuariosNoAgregados(1).then();
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

  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioRevisor = listado;
    this.filteredUsuarioRevisor = this.myControlRevisor.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterRevisor(nombre) : this.comboListadoUsuarioRevisor.slice())
      );
  }

  displayFnRevisor(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filterRevisor(nombre: string): Usuario[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoUsuarioRevisor.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  async listarEstados() {
    this.estadoService.listarParaEstrategia().then(data => {
      this.listadoEstados = data.payload;
    })

  }

  async listarRoles() {
    let estado: Estado = this.crearFormDialog.get('estado').value;
    await this.estadoService.obtenerRolesPorEstado(estado.id).then(data => {
      this.listadoRoles = data.payload.length !== 0 ? [data.payload[0].rol] : [];
      console.log(JSON.stringify(data.payload.length !== 0));
    })

  }

  crearEstrategiaSociedad(form: any) {
    /* crear la estrategia */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
