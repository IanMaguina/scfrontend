import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Rol } from 'src/app/models/rol.interface';
import { Sociedad } from 'src/app/models/sociedad.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-crear-estrategia-sociedad',
  templateUrl: './crear-estrategia-sociedad.component.html',
  styles: []

})
export class CrearEstrategiaSociedadComponent implements OnInit {



  formulary: FormGroup;
  formErrors = {
    'sociedad': '',
    'grupo_cliente': '',
    'usuario': '',
    'rol': '',
    'usuario_revisor': '',
  }
  validationMessages = {
    'sociedad': {
      'required': ' sociedad es requerida.',
    },
    'grupo_cliente': {
      'required': 'el grupo_cliente es requerido.',
    },
    'usuario': {
      'required': 'el usuario es requerido.',
    },
    'rol': {
      'required': 'el rol es requerido.',
    },
    'usuario_revisor': {
      'required': 'el revisor es requerido.',
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;




  listadoRoles: Rol[] = [];
  listadoSociedades: Sociedad[] = [];
  listadoGruposCliente: GrupoCliente[] = [];





  id_estado: number = 0;
  id_estado_rol: number = 0;
  /* usuarios */
  myControl = new FormControl();
  filteredUsuario!: Observable<Usuario[]>;
  comboListadoUsuario: Usuario[] = [];
  selectedUsuario: any;
  /* revisores */
  myControlRevisor = new FormControl();
  filteredUsuarioRevisor!: Observable<Usuario[]>;
  comboListadoUsuarioRevisor: Usuario[] = [];
  selectedUsuarioRevisor: any;

  ROL_SOLICITANTE = GlobalSettings.ROL_SOLICITANTE;
  visibleRolSolicitante = true;
  constructor(
    public dialogRef: MatDialogRef<CrearEstrategiaSociedadComponent>,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private formValidatorService: FormValidatorService,

    private usuarioService: UsuarioService,
    private rolUsuarioService: RolUsuarioService,
    private sociedadService: SociedadService,
    private grupoClienteService: GrupoClienteService,
  ) {
    this.formulary = this.formBuilder.group({
      rol: ['', Validators.required],
      sociedad: [''],
      grupo_cliente: [''],
      usuario: ['', Validators.required],
      usuario_revisor: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarRevisores();
    this.listarGrupos();
    this.listarSociedades();
    this.listarRoles();
    this.selectedRol();
  }

  async listarUsuarios() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuario = listado.payload;
    this.filteredUsuario = this.formulary.get('usuario')?.valueChanges
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
  async listarRevisores() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioRevisor = listado.payload;
    this.filteredUsuarioRevisor = this.formulary.get('usuario_revisor')?.valueChanges
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


  /* grupo  */
  async listarGrupos() {
    await this.grupoClienteService.listarGrupoCliente().then((data) => {

      this.listadoGruposCliente = data.payload;
    })
    // this.formulary.get('grupo_revisor')?.valueChanges
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      this.listadoSociedades = data;
    })
  }

  actualizarFormulario() {
    // let id_rol = this.formulary.get('rol').value.id;

  }

  async listarRoles() {
    await this.rolUsuarioService.listarRoles().then(data => {
      this.listadoRoles = data.payload.length !== 0 ? data.payload : [];

    })
  }

  async crearEstrategiaRolUsuario(form: any) {

    let rolUsuario = await this.mapeoRolUsuario(form);
    if (form.usuario && form.usuario.id || form.usuario && form.usuario.id && form.usuario_revisor && form.usuario_revisor.id) {
      this.rolUsuarioService.crearEstrategiaRolUsuario(rolUsuario).then((data) => {
        if (data.header.exito) {
          this.onNoClick('CONFIRM_DLG_YES');
        }
      });
    } else {
      this.callErrorDialog('Debe seleccionar el usuario de la estrategia');
    }

  }

  callErrorDialog(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje
    });
  }

  onNoClick(msg: string): void {
    this.dialogRef.close(msg);
  }

  async mapeoRolUsuario(form: any) {
    let rolUsuario: RolUsuario = {
      sociedad_codigo_sap: form.sociedad.codigo_sap,
      grupo_cliente_codigo_sap: form.grupo_cliente.codigo_sap,
      id_usuario: form.usuario.id,
      id_rol: form.rol.id,
      id_usuario_revisor: form.usuario_revisor.id,
    }
    return rolUsuario;
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  selectedRol() {
    let rol: Rol = this.formulary.get("rol").value;
    if(rol.id===this.ROL_SOLICITANTE){
      this.formulary.get("sociedad").setValidators(Validators.required);
      this.formulary.get("grupo_cliente").setValidators(Validators.required);
    }else{
      this.formulary.get("sociedad").removeValidators(Validators.required);
      this.formulary.get("grupo_cliente").removeValidators(Validators.required);
    }

    this.visibleRolSolicitante = (rol.id == this.ROL_SOLICITANTE ? true : false);
  }



}
