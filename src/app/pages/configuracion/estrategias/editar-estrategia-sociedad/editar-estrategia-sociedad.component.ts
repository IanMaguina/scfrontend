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
import { EstadoRolUsuario } from 'src/app/models/estado-rol-usuario.interface';
import { EstadoRolUsuarioAsignado } from 'src/app/models/estado-rol-usuario-asignado.interface';
@Component({
  selector: 'app-editar-estrategia-sociedad',
  templateUrl: './editar-estrategia-sociedad.component.html',
  styleUrls: ['./editar-estrategia-sociedad.component.css']
})
export class EditarEstrategiaSociedadComponent implements OnInit {

  estrategiaData: any;

  formDialog: any;
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

  id_estado:number=0;
  id_estado_rol:number=null;
  myControl = new FormControl();
  filteredUsuario!: Observable<Usuario[]>;
  comboListadoUsuario: Usuario[] = [];
  selectedUsuario: any;

  myControlRevisor = new FormControl();
  filteredUsuarioRevisor!: Observable<Usuario[]>;
  comboListadoUsuarioRevisor: Usuario[] = [];
  selectedUsuarioRevisor: any;
  estrategia:any;
  constructor(
    public dialogRef: MatDialogRef<EditarEstrategiaSociedadComponent>,
    /* poner el tipo de la data que esta viniendo, si es necesario */
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
    private estrategiaService: EstrategiaService
  ) {
    this.estrategia=data.estrategia;
    this.formDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
      estado: ['', Validators.required],
      rol: ['', Validators.required],
      revisor: ['', Validators.required],
    })
    this.formDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formDialog, this.formErrors, this.validationMessages, this.submitted);
    })
    this.listarEstados();
    this.listarUsuariosNoAgregados();
    this.listarUsuarios();
  }

  ngOnInit(): void {

    this.editarEstrategia();
  }

  editarEstrategia(){
    this.estrategiaService.editarEstrategia(this.estrategia.id).then(data => {
      let reg=data.payload;
      this.formDialog.get('estado').setValue({id:data.payload.estadoRol.estado.id});
      this.listarRoles();

      this.formDialog.get('rol').setValue({id:reg.id_estado_rol});
      this.formDialog.get('usuario').setValue({id:reg.id_usuario, nombre:reg.usuario.nombre});
      if(reg.revisor){
        console.log(reg.id_usuario_revisor+"-"+reg.revisor.nombre)
        this.formDialog.get('revisor').setValue({id:reg.id_usuario_revisor, nombre:reg.revisor.nombre});
      }
      

    })
  }

  async listarUsuariosNoAgregados() {
    let listado = await this.estrategiaService.listarUsuariosNoAgregados(1).then();
    this.comboListadoUsuario = listado;
    //console.log(JSON.stringify(listado));
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
      console.log("estados-->"+JSON.stringify(data.payload))
      this.listadoEstados = data.payload;
    })
  }

  async listarRoles() {
    let estado: Estado = this.formDialog.get('estado').value;
    this.id_estado=estado.id;
    await this.estadoService.obtenerRolesPorEstado(estado.id).then(data => {
      this.listadoRoles = data.payload.length !== 0 ? [data.payload[0].rol] : [];
      this.id_estado_rol=data.payload.length !== 0 ? Number(data.payload[0].id) : null;
      console.log("roles--->"+JSON.stringify(data));
    })

  }

  async actualizarEstrategiaSociedad(form: any) {
    console.log("Actualizar EstadoRolUsuario:" + JSON.stringify(form));
    let estadoRolUsuario = await this.mapeoEstadoRolUsuario(form)
    this.estrategiaService.actualizarEstrategia(this.estrategia.id,estadoRolUsuario).then();
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async mapeoEstadoRolUsuario(form: any) {
    let estadoRolUsuario: EstadoRolUsuario = {
      id_estado_rol:this.id_estado_rol,
      id_usuario:form.usuario.id,
      id_usuario_revisor: form.revisor?form.revisor.id:null
    }
    console.log("mapeo--->"+JSON.stringify(estadoRolUsuario));
    return estadoRolUsuario;
  }

  compareEstado(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareEstadoRol(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareUsuario(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }
}
