import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsistenteFacturacion } from 'src/app/models/asistente-facturacion.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { Zonal } from 'src/app/models/zonal.interface';
import { AsistenteFacturacionService } from 'src/app/services/asistente-facturacion.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ZonalService } from 'src/app/services/zonal.service';

@Component({
  selector: 'app-editar-asistente-facturacion',
  templateUrl: './editar-asistente-facturacion.component.html',
  styles: [
  ]
})
export class EditarAsistenteFacturacionComponent implements OnInit {
  formDialog: FormGroup;
  asistenteData:AsistenteFacturacion;
  formErrors = {
    'zonal': '',
    'usuario': '',
  }
  validationMessages = {
    'zonal': {
      'required': 'el zonal es requerido.',
    },
    'usuario': {
      'required': 'el usuario es requerido.'
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  comboListadoUsuario: Usuario[]=[];
  filteredUsuario!: Observable<Usuario[]>;
  selectedUsuario: any;

  listadoZonales: Zonal[];

  constructor(
    public dialogRef: MatDialogRef<EditarAsistenteFacturacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AsistenteFacturacion,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private usuarioService: UsuarioService,
    private zonalService: ZonalService,
    private asistenteFacturacionService: AsistenteFacturacionService,

  ) {
    this.asistenteData = data;
    console.log("recibido asistente : "+ JSON.stringify(this.asistenteData.id));
    this.formDialog = this.formBuilder.group({
      zonal: [this.asistenteData.zonal.id, Validators.required],
      usuario: [this.asistenteData.usuario, Validators.required],
    })
    this.formDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarZonales();
  }



  async editarAsistenteFacturacion(form: any) {
    form.id = this.asistenteData.id;
    form.activo = this.asistenteData.activo;
    console.log("to send AF: "+JSON.stringify(form));
    this.asistenteFacturacionService.actualizarAsistenteFacturacion(form).then(data => {
      if (data.header.exito) {
        this.onNoClick('CONFIRM_DLG_YES');
      }
    })
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }
  async filtrarUsuarioZonal(){
    let zonal=this.formDialog.get("zonal").value;
    console.log(JSON.stringify(zonal)+"---al cambiar el zonal: " );
    let listado = await this.asistenteFacturacionService.listarUsuariosNoAgregados().then();
    this.comboListadoUsuario = listado.payload;
    this.filteredUsuario = this.formDialog.get('usuario')?.valueChanges
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
    this.filteredUsuario = this.formDialog.get('usuario')?.valueChanges
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
