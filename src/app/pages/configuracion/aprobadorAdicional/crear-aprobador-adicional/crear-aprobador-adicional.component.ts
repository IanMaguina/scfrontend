import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.interface';
import { AprobadorAdicionalService } from 'src/app/services/aprobador-adicional.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-aprobador-adicional',
  templateUrl: './crear-aprobador-adicional.component.html',
  styles: [
  ]
})
export class CrearAprobadorAdicionalComponent implements OnInit {

  formDialog: FormGroup;

  formErrors = {
    'usuario': '',
  }
  validationMessages = {
    'usuario': {
      'required': 'el usuario es requerido.'
    }
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  comboListadoUsuario: Usuario[]=[];
  filteredUsuario!: Observable<Usuario[]>;
  selectedUsuario: any;


  constructor(
    public dialogRef: MatDialogRef<CrearAprobadorAdicionalComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private aprobadorAdicionalService: AprobadorAdicionalService,

  ) {

    this.formDialog = this.formBuilder.group({
      usuario: ['', Validators.required],
    })
    this.formDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }



  async crearAprobadorAdicional(form: any) {
    this.aprobadorAdicionalService.crearAprobadorAdicional(form).then(data => {
      if (data.header.exito) {
        this.onNoClick('CONFIRM_DLG_YES');
      }
    })
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

  /*  auto complete*/
  async listarUsuarios() {
    
    let listado = await this.aprobadorAdicionalService.listarUsuariosNoAgregados().then();
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


}
