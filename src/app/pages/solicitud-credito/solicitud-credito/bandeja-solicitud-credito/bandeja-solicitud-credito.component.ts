import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivationEnd, Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { TipoCliente } from 'src/app/models/tipo-cliente.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-bandeja-solicitud-credito',
  templateUrl: './bandeja-solicitud-credito.component.html',
  styles: [
  ]
})
export class BandejaSolicitudCreditoComponent implements OnInit, OnDestroy {
  listadoSolicitudes: Solicitud[] = [];
  listadotipoCliente: TipoCliente[] = [
    {
      id: 1,
      nombre: 'Grupo Empresarial'
    },
    {
      id: 2,
      nombre: 'Consorcio'
    },
    {
      id: 3,
      nombre: 'Empresa Individual'
    },
  ];

  listadoEstadosSolicitud: any[] = [];
  formulary: FormGroup;
  displayedColumns: string[] = [
    'estado',
    'correlativo',
    'numero_documento',
    'cliente',
    'razon_social',
    'grupo_cliente',
    'canal_comercial',
    'importe',
    'documento_valorado',
    'tipo_plan',
    'fecha_creacion',
    'usuario'
  ];

  formErrors = {
    'tipo_cliente': '',
    'numero_documento': '',
    'estado': '',
    'solicitud': '',
    'fecha': '',
  }

  validationMessages = {
    'tipo_cliente': {
      'required': 'el tipo_cliente es requerido.'
    },
    'numero_documento': {
      'required': 'el ruc es requerido.'
    },
    'estado': {
      'required': 'el estado es requerido.'
    },
    'correlativo': {
      'required': 'el correlativo es requerido.'
    },
    'fecha': {
      'required': 'el fecha es requerido.'
    },

  };
  //Submitted form
  submitted = false;
  carga: boolean = false;
  userInfo: any;
  ESTADO_SOLICITUD: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;
  ESTADO_SOLICITUD_EN_EVALUACION: number = GlobalSettings.ESTADO_SOLICITUD_EN_EVALUACION;
  ESTADO_SOLICITUD_DEVUELTO_POR_REVISOR: number = GlobalSettings.ESTADO_SOLICITUD_DEVUELTO_POR_REVISOR;
  TIPO_CLIENTE_GRUPO_EMPRESARIAL: number = GlobalSettings.TIPO_CLIENTE_GRUPO_EMPRESARIAL;

  notGrupo: boolean = false;
  esConsulta: boolean = false;
  title: string;
  public rutaSubs$: Subscription;

  //para la paginacion por pipes
  itemPerPage = GlobalSettings.CANTIDAD_FILAS;
  page: number = 0;
  totalRegister: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService,
    private autenticacionService: AutenticacionService,
    private router: Router,

  ) {
    this.rutaSubs$ = this.getArgumentosRuta()
      .subscribe(({ titulo, acceso }) => {
        this.title = titulo;
        if (acceso === 'general') {
          this.esConsulta = true;
          this.listarSolicitud();
        }
      });

    this.userInfo = this.autenticacionService.getUserInfo();
    this.formulary = this.formBuilder.group({
      tipo_cliente: ['',],
      numero_documento: [''],
      estado: [''],
      correlativo: [''],
      fecha: [''],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit() {
    console.log("ngOnInit  bandeja de pendientes");
    this.listarSolicitud();
    this.listarEstadosSolicitud();
    this.validarTipoDocumento();
  }
  ngOnDestroy(): void {
    this.rutaSubs$.unsubscribe();
  }
  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
  }

  listarSolicitud() {
    this.page = 0;
    let item;
    if (!this.esConsulta) {
      item = {
        id_usuario: this.userInfo.id
      }
    } else {
      item = {};
    }
    this.solicitudService.listarSolicitudesxFiltros(item).then(data => {
      console.log("solicitudes-------->" + JSON.stringify(data));
      this.listadoSolicitudes = data.payload;
      this.totalRegister = this.listadoSolicitudes.length;
    })
  }

  listarEstadosSolicitud() {
    this.solicitudService.listarEstadosSolicitud().then(data => {
      this.listadoEstadosSolicitud = data.payload;
    });
  }

  editarSolicitud(element: any) {
    console.log("editarSolicitud--->" + JSON.stringify(element));
    switch (element.id_estado) {
      case this.ESTADO_SOLICITUD_EN_SOLICITANTE:
        this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', element.id]);
        break;
      case this.ESTADO_SOLICITUD_DEVUELTO_POR_REVISOR:
        this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', element.id]);
        break;
      case this.ESTADO_SOLICITUD_EN_REVISION:
        //this.router.navigate(['app/solicitudcredito/editarSolicitudCredito', element.id]);
        this.router.navigate(['app/solicitudcredito/revisarSolicitudCredito', element.id]);
        break;
      case this.ESTADO_SOLICITUD_EN_EVALUACION:
        this.router.navigate(['app/solicitudcredito/evaluarSolicitudCredito', element.id]);
        break;
    }
  }

  async buscarSolicitudes(form: any) {
    this.page=0;
    this.listadoSolicitudes = [];
    if (!this.esConsulta) {
      form.id_usuario = this.userInfo.id;
    }

    await this.solicitudService.listarSolicitudesxFiltros(form).then(data => {
      console.log("solicitudes filtradas:" + JSON.stringify(data));
      this.listadoSolicitudes = data.payload;
      this.totalRegister = this.listadoSolicitudes.length;
      // this.limpiar();
    });
  }
  async validarTipoDocumento() {
    let tipo_cliente = this.formulary.get("tipo_cliente").value.id;
    if (tipo_cliente == this.TIPO_CLIENTE_GRUPO_EMPRESARIAL) {
      this.notGrupo = false;
    } else {
      this.notGrupo = true;
    }

  }

  limpiar() {
    this.formulary.get("tipo_cliente").setValue("");
    this.formulary.get("numero_documento").setValue("");
    this.formulary.get("estado").setValue("");
    this.formulary.get("correlativo").setValue("");
    this.formulary.get("fecha").setValue("");

  }

  nextPage() {
    this.page += this.itemPerPage;
  }
  prevPage() {
    if (this.page > 0) {
      this.page -= this.itemPerPage;
    }
  }
}
