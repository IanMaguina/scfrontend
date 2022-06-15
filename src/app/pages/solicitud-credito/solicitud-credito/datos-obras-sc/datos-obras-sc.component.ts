import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { SolicitudClienteObraDTO } from 'src/app/dto/solicitud-cliente-obra.dto';
import { Obra } from 'src/app/models/obra.interface';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-datos-obras-sc',
  templateUrl: './datos-obras-sc.component.html',
  styles: [
  ]
})
export class DatosObrasScComponent implements OnInit {

  @Output() onThirdFormGroup: EventEmitter<any> = new EventEmitter();
  @Input() id_solicitud_editar: number;

  thirdFormGroup: FormGroup;
  formulary: FormGroup;
  submitted = false;
  formErrors = {
    'informacion_adicional': '',
    'fecha_inicio_atencion': '',
    'fecha_fin_atencion': '',

  }
  validationMessages = {
    'informacion_adicional': {
      'required': 'informacion adicional es requerida.'
    },
    'fecha_inicio_atencion': {
      'required': 'fecha inicio atencion es requerido.'
    },
    'fecha_fin_atencion': {
      'required': 'fecha fin atenciones requerido.'
    },

  };
  listadoObras: SolicitudClienteObraDTO[] = [];
  /* {
    id: 1,
    id_solicitud: 1,
    obra_codigo_isicom: '1515',
    dueno: 'jack O neil',
    ubicacion: 'Lima',
    plazo_obra: '48 Meses',
    nombre_obra: 'Obra Las Bambas',
    fecha_inicio_obra: '15/01/2020',
    fecha_fin_obra: '20/06/2023'
  },
  {
    id: 2,
    id_solicitud: 1,
    obra_codigo_isicom: '1516',
    dueno: 'jack O neil',
    ubicacion: 'Lima',
    plazo_obra: '48 Meses',
    nombre_obra: 'Obra Vichapampa',
    fecha_inicio_obra: '15/01/2020',
    fecha_fin_obra: '20/06/2023'
  },
]; */

  userInfo: any;
  solicitud: Solicitud;
  ESTADO_SOLICITUD: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private _snack: MatSnackBar,
    private solicitudService: SolicitudService,    
    private autenticacionService: AutenticacionService

  ) {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.thirdFormGroup = this.formBuilder.group({
      codigo_obra: ['', Validators.required],
    });
    this.formulary = this.formBuilder.group({
      obrasArray: this.formBuilder.array([])
    });
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.submitted)
    })

  }
  ngOnInit(): void {
    console.log("id solicitud en obras: " + this.id_solicitud_editar);
    if (this.id_solicitud_editar !== null) {
      this.listarObras();
      this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(data => {
        this.solicitud = data.payload;
        this.ESTADO_SOLICITUD=this.solicitud.id_estado;
        console.log("peru qatar--->" + JSON.stringify(this.solicitud));
      })
    }

  }

  listarObras() {
    this.solicitudService.listarSolicitudObras(this.id_solicitud_editar).then(data => {
      this.listadoObras = data.payload;
      console.log("data fechas " + JSON.stringify(data.payload));
      this.formulary.setControl('obrasArray', this.mapearObra(this.listadoObras));
      // console.log("las obras listadas de la solicitud " + this.id_solicitud_editar + " son :" + JSON.stringify(data.payload));
    });
  }

  async getDataObra(form: any) {
    await this.solicitudService.listarObra(form.codigo_obra).then(async data => {
      let obra_solicitud: Obra = await this.mapeoObra(data);
      this.solicitudService.asignarObra(obra_solicitud).then((response) => {
        if (response.header.exito) {
          this.generarMensaje("Se agregó la Obra");
          this.listarObras();
        }
      })
    })
  }

  get obrasArray(): FormArray {
    return this.formulary.get('obrasArray') as FormArray;
  }

  mapearObra(lista: SolicitudClienteObraDTO[]): FormArray {
    const valor = lista.map((SolicitudClienteObraDTO.asFormGroup));
    return new FormArray(valor);
  }

  async mapeoObra(data: any) {
    let obraSolicitud: SolicitudClienteObraDTO = {
      id: data.id,
      id_solicitud: this.id_solicitud_editar,
      obra_codigo_isicom: data.obra_codigo_isicom,
      dueno: data.dueno,
      ubicacion: data.ubicacion,
      plazo_obra: data.duracion,
      nombre_obra: data.nombre_obra,
      informacion_adicional: data.informacion_adicional,
      fecha_inicio_obra: data.fecha_inicio_obra,
      fecha_fin_obra: data.fecha_fin_obra,
      fecha_inicio_atencion: data.fecha_inicio_atencion,
      fecha_fin_atencion: data.fecha_fin_atencion
    }
    return obraSolicitud;
  }

  eliminarSolicitudObra(id_solicitud_obra: number) {
    this.solicitudService.eliminarSolicitudObra(id_solicitud_obra).then((data) => {
      if (data.header.exito) {
        this.generarMensaje("se eliminó la obra correctamente");
      }
    });
  }

  //actualizar obra
  async actualizarSolicitudObra(form: any) {
    console.log(JSON.stringify(form));
    let solicitudObra: SolicitudClienteObraDTO = await this.mapeoObra(form)
    this.solicitudService.actualizarSolicitudObra(solicitudObra).then((data) => {
      if (data.header.exito) {
        this.generarMensaje("se actualizó la obra correctamente");
      }
    })
  }

  generarMensaje(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

}
