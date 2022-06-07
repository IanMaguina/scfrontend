import { GlobalSettings } from 'src/app/shared/settings';
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
import { Observable, throwError } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GrupoCliente } from 'src/app/models/grupo-cliente.interface';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';
import { SociedadService } from 'src/app/services/sociedad.service';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-editar-estrategia-sociedad',
  templateUrl: './editar-estrategia-sociedad.component.html',
  styleUrls: []
})
export class EditarEstrategiaSociedadComponent implements OnInit {

  formulary!: FormGroup;
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

  ROL_SOLICITANTE = GlobalSettings.ROL_SOLICITANTE;
  visibleRolSolicitante = true;

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
    console.log("el rol usuario que viene es : " + JSON.stringify(this.rolUsuarioData));
    this.formulary = this.formBuilder.group({
      id: [this.rolUsuarioData.id],
      sociedad: [this.rolUsuarioData.sociedad],
      grupo_cliente: [this.rolUsuarioData.grupo_cliente],
      usuario: [this.rolUsuarioData.usuario, Validators.required],
      rol: [this.rolUsuarioData.rol, Validators.required],
      usuario_revisor: [this.rolUsuarioData.usuario_revisor],
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


  /* autocomplete*/
  /*usuarios */
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

  /* revisores */
  async listarRevisores() {
    let listado = await this.usuarioService.listarUsuarios().then();
    this.comboListadoUsuarioRevisor = listado.payload;
    this.filteredUsuarioRevisor = this.formulary.get('revisor')?.valueChanges
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
      this.rolUsuarioService.editarEstrategiaRolUsuario(rolUsuario).then((data) => {
        if (data.mensaje) {
          this.callErrorDialog(data.mensaje);
        } else {
          console.log("response modificación: "+JSON.stringify(data.payload));
          this.onNoClick('CONFIRM_DLG_YES');
        }
      });
    } else {
      this.callErrorDialog(mensaje);
    }

  }
  /* async editarEstrategiaRolUsuario(form: any) {
    console.log("Actualizar RolUsuario:" + JSON.stringify(form));
    let rolUsuario = await this.mapeoRolUsuario(form)
    let mensaje = "¡Nombre de usuario no válido!";

    if (form.usuario && form.usuario.id || form.usuario && form.usuario.id && form.usuario_revisor && form.usuario_revisor.id) {
      this.rolUsuarioService.editarEstrategiaRolUsuario2(rolUsuario)
        .pipe(
          tap( (data)  => {
            console.log(JSON.stringify(data));
            if(data.mensaje){
              this.callErrorDialog(data.mensaje);
            }
            this.onNoClick('CONFIRM_DLG_YES');

          }),
          catchError((err: HttpErrorResponse) => {
          console.log("error sistema: "+err.error.header.mensaje);
          return throwError(() => err)
        }))
        .subscribe();
    } else {
      this.callErrorDialog(mensaje);
    }
  } */

  async listarGrupos() {
    await this.grupoClienteService.listarGrupoCliente().then((data) => {

      this.listadoGruposCliente = data.payload;
      console.log("listadoGruposCliente-->" + JSON.stringify(this.listadoGruposCliente));
    })
    // this.formulary.get('grupo_revisor')?.valueChanges
  }

  async listarSociedades() {
    this.sociedadService.listarSociedades().then(data => {
      this.listadoSociedades = data;
      console.log("sociedades-->" + JSON.stringify(this.listadoSociedades));
    })
  }
  async listarRoles() {
    this.rolUsuarioService.listarRoles().then(data => {
      this.listadoRoles = data.payload;
    })
  }




  async mapeoRolUsuario(form: any) {
    let rolUsuario: RolUsuario = {
      id: form.id,
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

  compareGrupoCliente(o1: any, o2: any) {
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

  selectedRol() {
    let rol: Rol = this.formulary.get("rol").value;
    if (rol.id === this.ROL_SOLICITANTE) {
      this.formulary.get("sociedad").setValidators(Validators.required);
      this.formulary.get("grupo_cliente").setValidators(Validators.required);
    } else {
      this.formulary.get("sociedad").removeValidators(Validators.required);
      this.formulary.get("grupo_cliente").removeValidators(Validators.required);
    }
    this.visibleRolSolicitante = (rol.id == this.ROL_SOLICITANTE ? true : false);
  }




}
