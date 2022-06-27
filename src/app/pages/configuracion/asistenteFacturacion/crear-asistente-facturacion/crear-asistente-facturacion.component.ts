import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsistenteFacturacion } from 'src/app/models/asistente-facturacion.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { Zonal } from 'src/app/models/zonal.interface';
import { AsistenteFacturacionService } from 'src/app/services/asistente-facturacion.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ZonalService } from 'src/app/services/zonal.service';

@Component({
  selector: 'app-crear-asistente-facturacion',
  templateUrl: './crear-asistente-facturacion.component.html',
  styles: [
  ]
})
export class CrearAsistenteFacturacionComponent implements OnInit {

  crearFormDialog: FormGroup;

  formErrors = {
    'usuario': '',
    'zonal': '',
  }
  validationMessages = {
    'usuario': {
      'required': 'el usuario es requerido.'
    },
    'zonal': {
      'required': 'el zonal es requerido.',
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  comboListadoUsuario: Usuario[]=[];
  filteredUsuario!: Observable<Usuario[]>;
  selectedUsuario: any;

  listadoZonales: Zonal[];
  /*  {id:1, nombre:'zona 1'},
   {id:2, nombre:'zona 2'},
   {id:3, nombre:'zona 3'},
   {id:4, nombre:'zona 4'},
 ]; */

  constructor(
    public dialogRef: MatDialogRef<CrearAsistenteFacturacionComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private zonalService: ZonalService,
    private asistenteFacturacionService: AsistenteFacturacionService,

  ) {

    this.crearFormDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
      zonal: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarZonales();
  }



  async crearAsistenteFacturacion(form: any) {
    let asistenteFacturacion:AsistenteFacturacion=await this.mapeo(form);
    this.asistenteFacturacionService.crearAsistenteFacturacion(asistenteFacturacion).then(data => {
      if (data.header.exito) {
        this.onNoClick('CONFIRM_DLG_YES');
      }
    })
  }

  async mapeo(form: any) {
    let asistenteFacturacion: AsistenteFacturacion = {
        zonal_codigo_sap: form.zonal.codigo_sap,
        id_usuario: form.usuario.id,
      }
    return asistenteFacturacion;
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }
  async filtrarUsuarioZonal(){
    let zonal=this.crearFormDialog.get("zonal").value;
    console.log(JSON.stringify(zonal)+"---al cambiar el zonal: " );
    let listado = await this.asistenteFacturacionService.listarUsuariosNoAgregados().then();
    this.comboListadoUsuario = listado.payload;
    this.filteredUsuario = this.crearFormDialog.get('usuario')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this.comboListadoUsuario.slice() )
      );

  }
  /*  auto complete*/
  async listarUsuarios() {
    
    let listado = await this.asistenteFacturacionService.listarUsuariosNoAgregados().then();
    this.comboListadoUsuario = listado.payload;
    this.filteredUsuario = this.crearFormDialog.get('usuario')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this.comboListadoUsuario.slice() )
      );
  }

  displayFn(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(nombre: string): Usuario[] {
    let filterValue = nombre.toLowerCase();
    return this.comboListadoUsuario.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }


  async listarZonales() {
    await this.zonalService.listarZonales().then((zonales) => {
      this.listadoZonales = zonales;
    });
  }

}
