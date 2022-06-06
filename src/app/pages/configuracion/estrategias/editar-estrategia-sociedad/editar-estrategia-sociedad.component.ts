import { EstrategiaService } from './../../../../services/estrategia.service';
import { EstadoService } from './../../../../services/estado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estado } from 'src/app/models/estado.interface';
import { Rol } from 'src/app/models/rol.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoRolUsuario } from 'src/app/models/estado-rol-usuario.interface';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
/* import { Estrategia } from 'src/app/models/estrategia.interface'; */
import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolUsuarioService } from '@services/rol-usuario.service';



@Component({
  selector: 'app-editar-estrategia-sociedad',
  templateUrl: './editar-estrategia-sociedad.component.html',
  styleUrls: []
})
export class EditarEstrategiaSociedadComponent implements OnInit {

  

  formDialog!: FormGroup;
  formErrors = {
    'sociedad': '',
    'grupo_cliente': '',
    'usuario': '',
    'rol': '',
    'usuario_revisor': '',
  }
  validationMessages = {
    'sociedad': {
      'required': 'el usuario es requerido.',
    },
    'grupo_cliente': {
      'required': 'el estado es requerido.',
    },
    'usuario': {
      'required': 'el rol es requerido.',
    },
    'rol': {
      'required': 'el revisor es requerido.',
    },
    'usuario_revisor': {
      'required': 'el revisor es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;


  listadoSociedades: Sociedad[] = [];
  listadoGruposCliente: GrupoCliente[] = [];
  listadoRoles: Rol[] = [];

  rolUsuarioData: RolUsuario;

  id_rol: number = null;

  myControl = new FormControl();
  filteredUsuario!: Observable<Usuario[]>;
  comboListadoUsuario: Usuario[] = [];
  selectedUsuario: any;

  myControlRevisor = new FormControl();
  filteredUsuarioRevisor!: Observable<Usuario[]>;
  comboListadoUsuarioRevisor: Usuario[] = [];
  selectedUsuarioRevisor: any;





  constructor(
    public dialogRef: MatDialogRef<EditarEstrategiaSociedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private _snack: MatSnackBar,

    private usuarioService: UsuarioService,
    private rolUsuarioService: RolUsuarioService,
    private sociedadService: SociedadService,
    private grupoClienteService: GrupoClienteService,
  ) {
    this.rolUsuarioData = data.estrategiaRolUsuario;
    console.log("el rol usuario que viene es : "+JSON.stringify(this.rolUsuarioData));
    this.formDialog = this.formBuilder.group({
      id:[this.rolUsuarioData.id],
      sociedad: [this.rolUsuarioData.sociedad, Validators.required],
      grupo_cliente: [this.rolUsuarioData.grupo_cliente, Validators.required],
      usuario: [this.rolUsuarioData.usuario, Validators.required],
      rol: [this.rolUsuarioData.rol, Validators.required],
      usuario_revisor: [this.rolUsuarioData.usuario_revisor],
    })
    this.formDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formDialog, this.formErrors, this.validationMessages, this.submitted);
    })

    this.listarUsuarios();
    this.listarGrupos();
    this.listarSociedades();
  }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarGrupos();
    this.listarSociedades();
    this.listarRoles();
  }


  /* autocomplete*/
  /*usuarios */
  async listarUsuariosNoAgregados() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuario = listado.payload;
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

  /* revisores */
  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioRevisor = listado.payload;
    this.filteredUsuarioRevisor = this.formDialog.get('revisor')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterRevisor(nombre) : this.comboListadoUsuarioRevisor.slice())
      );
  }

  displayFnRevisor(user: Usuario): string {
    console.log("--displayFnRevisor-->" + JSON.stringify(user));
    return user && user.nombre ? user.nombre : '';
  }

  private _filterRevisor(nombre: string): Usuario[] {
    let filterValue = nombre.toLowerCase();
    console.log("_filterRevisor-->" + nombre + "--");
    return this.comboListadoUsuarioRevisor.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  /* fin autocomplete */

  async editarEstrategiaRolUsuario(form: any) {
    console.log("Actualizar RolUsuario:" + JSON.stringify(form));
    let rolUsuario = await this.mapeoRolUsuario(form)
    let mensaje = "¡Nombre de usuario no válido!";

    if (form.usuario && form.usuario.id || form.usuario && form.usuario.id && form.usuario_revisor && form.usuario_revisor.id) {
      this.rolUsuarioService.editarEstrategiaRolUsuario(rolUsuario).then(() => {
        this.onNoClick('CONFIRM_DLG_YES');
      });
    } else {
      this.callErrorDialog(mensaje);
    }

  }

  async listarGrupos() {
    await this.grupoClienteService.listarGrupoCliente().then((data) => {

      this.listadoGruposCliente = data.payload;
    })
    // this.formDialog.get('grupo_revisor')?.valueChanges
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      this.listadoSociedades = data;
    })
  }
  async listarRoles() {
    this.rolUsuarioService.listarRoles().then(data => {
      this.listadoRoles = data.payload;
    })
  }




  async mapeoRolUsuario(form: any) {
    let rolUsuario: RolUsuario = {
      id:form.id,
      sociedad_codigo_sap: form.sociedad.codigo_sap,
      grupo_cliente_codigo_sap: form.grupo_cliente.codigo_sap,
      id_usuario: form.usuario.id,
      id_rol: form.rol.id,
      id_usuario_revisor: form.usuario_revisor.id,
    }
    console.log("mapeo--->" + JSON.stringify(rolUsuario));
    return rolUsuario;
  }



  compareRol(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareUsuario(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }
  
  compareSociedad(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }



 


  /* utils */

  onNoClick(msg: string): void {
    this.dialogRef.close(msg);
  }

  callErrorDialog(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje
    });
  }





}
