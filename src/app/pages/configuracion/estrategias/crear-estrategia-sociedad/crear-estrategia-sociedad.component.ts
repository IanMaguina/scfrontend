import { EstrategiaService } from './../../../../services/estrategia.service';
import { EstadoService } from './../../../../services/estado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { EstadoRolUsuario } from 'src/app/models/estado-rol-usuario.interface';
import { EstadoRolUsuarioAsignado } from 'src/app/models/estado-rol-usuario-asignado.interface';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';

@Component({
  selector: 'app-crear-estrategia-sociedad',
  templateUrl: './crear-estrategia-sociedad.component.html',
  styles: []
  /* no acepta './crear-estrategia-sociedad.component.css' */
  
})
export class CrearEstrategiaSociedadComponent implements OnInit {



  formDialog: FormGroup;
  formErrors = {
    'usuario': '',
    'estado': '',
    'rol': '',
    'revisor': '',
    'grupo_revisor': '',
    'sociedad_revisor': '',
  }
  validationMessages = {
    'usuario': {
      'required': 'el usuario es requerido.',
    },
    'estado': {
      'required': 'el estado es requerido.',
    },
    'rol': {
      'required': 'el rol es requerido.',
    },
    'revisor': {
      'required': 'el revisor es requerido.',
    },
    'grupo_revisor': {
      'required': 'el revisor es requerido.',
    },
    'sociedad_revisor': {
      'required': 'el revisor es requerido.',
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  //poner el tipado correcto => es data dummy

  listadoSociedadRevisor: Sociedad[] = [];

  /* poner el tipo del modelo Rol */

  listadoRoles: Rol[] = [];
  /*    { id: 1, nombre: 'rol 1' },
     { id: 2, nombre: 'rol 2' },
   ];
  */
  listadoEstados: Estado[] = [];
  /*     { id: 1, nombre: 'Estado 1' },
      { id: 2, nombre: 'Estado 2' },
    ]; */

  id_estado: number = 0;
  id_estado_rol: number = 0;
  myControl = new FormControl();
  filteredUsuario!: Observable<Usuario[]>;
  comboListadoUsuario: Usuario[] = [];
  selectedUsuario: any;

  myControlRevisor = new FormControl();
  filteredUsuarioRevisor!: Observable<Usuario[]>;
  comboListadoUsuarioRevisor: Usuario[] = [];
  selectedUsuarioRevisor: any;

  myControlGrupoRevisor = new FormControl();
  filteredGrupoRevisor!: Observable<GrupoCliente[]>;
  comboListadoGrupoRevisor: GrupoCliente[] = [];
  selectedGrupoRevisor: any;

  constructor(
    public dialogRef: MatDialogRef<CrearEstrategiaSociedadComponent>,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
    private estrategiaService: EstrategiaService,
    private sociedadService: SociedadService,
    private grupoService: GrupoClienteService,
  ) {
    this.formDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
      estado: ['', Validators.required],
      rol: ['', Validators.required],
      revisor: [''],
      grupo_revisor: [''],
      sociedad_revisor: [''],
    })
    this.formDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarEstados();
    this.listarUsuarios();
    this.listarGrupos();
    this.listarSociedades();
  }

  async listarUsuariosNoAgregados() {
    let listado = await this.estrategiaService.listarUsuariosNoAgregados(this.id_estado_rol).then();
    this.comboListadoUsuario = listado;
    console.log(JSON.stringify(listado));
    this.filteredUsuario = this.formDialog.get('usuario')?.valueChanges
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



  /* usuario revisor */
  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioRevisor = listado;
    this.filteredUsuarioRevisor = this.formDialog.get('revisor')?.valueChanges
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


  /* grupo revisor */
  async listarGrupos() {
    let listado = await this.grupoService.listarGrupoCliente().then()
    this.comboListadoGrupoRevisor = listado;
    this.filteredGrupoRevisor = this.formDialog.get('grupo_revisor')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterGrupoRevisor(nombre) : this.comboListadoGrupoRevisor.slice())
      );
  }

  displayFnGrupoRevisor(grupo: GrupoCliente): string {
    return grupo && grupo.nombre ? grupo.nombre : '';
  }

  private _filterGrupoRevisor(nombre: string): GrupoCliente[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoGrupoRevisor.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      this.listadoSociedadRevisor = data;
    })
  }




  async listarEstados() {
    this.estadoService.listarParaEstrategia().then(data => {
      this.listadoEstados = data.payload;
    })
  }

  async listarRoles() {
    let estado: Estado = this.formDialog.get('estado').value;
    this.id_estado = estado.id;
    if (estado.id === 1) {
      this.formDialog.get('revisor')?.setValidators([Validators.required]);
      this.formDialog.get('revisor').setValue("");
    } else {
      this.formDialog.get('revisor')?.setValidators([]);
      this.formDialog.get('revisor').setValue("");
    }
    this.formDialog.get("revisor")?.updateValueAndValidity();
    await this.estadoService.obtenerRolesPorEstado(estado.id).then(data => {
      //console.log("obtener roles por estado: "+ JSON.stringify(data));
      this.listadoRoles = data.payload.length !== 0 ? [data.payload[0].rol] : [];
      this.id_estado_rol = data.payload.length !== 0 ? data.payload[0].id : null;
      this.listarUsuariosNoAgregados();
      console.log(JSON.stringify(this.id_estado_rol));
    })

  }

  async crearEstrategiaSociedad(form: any) {
    console.log("Crear EstadoRolUsuario:" + JSON.stringify(form));
    let estadoRolUsuario = await this.mapeoEstadoRolUsuario(form)
    let mensaje = "¡Nombre de usuario no válido!";

    if (form.estado.id === 1) {
      if (form.usuario && form.usuario.id && form.revisor && form.revisor.id) {
        this.estrategiaService.crearEstrategia(estadoRolUsuario).then(() => {
          this.onNoClick();
        });
      } else {
        this.callErrorDialog(mensaje);
      }
    } else {
      if (form.usuario && form.usuario.id) {
        this.estrategiaService.crearEstrategia(estadoRolUsuario).then(() => {
          this.onNoClick();
        });
      } else {
        this.callErrorDialog(mensaje);

      }
    }
  }

  callErrorDialog(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async mapeoEstadoRolUsuario(form: any) {
    let estadoRolUsuario: EstadoRolUsuario = {
      id_estado_rol: this.id_estado_rol,
      id_usuario: form.usuario.id,
      id_usuario_revisor: form.revisor.id
    }
    return estadoRolUsuario;
  }


}
