import { Empresa } from './../../../../models/empresa.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ConsorciosCoincidentesDialogComponent } from './consorcios-coincidentes-dialog/consorcios-coincidentes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { GruposCoincidentesDialogComponent } from './grupos-coincidentes-dialog/grupos-coincidentes-dialog.component';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-datos-cliente-sc',
  templateUrl: './datos-cliente-sc.component.html',
  styles: [
  ]
})
export class DatosClienteScComponent implements OnInit {
  @Output() onFirstFormGroup: EventEmitter<any> = new EventEmitter();
  @Output() id_solicitud_hija: EventEmitter<any> = new EventEmitter();
  @Input() id_solicitud_editar: number;
  firstFormGroup: FormGroup;
  /* to settings constantes */
  radioGrupo: number = 1;
  radioConsorcio: number = 2;
  radioEmpresa: number = 3;
  /* end */
  cliente: number = 1;
  ClientSelectorControl = new FormControl('auto');
  panelOpenState = false;

  /* toolTip control */
  positionOption: TooltipPosition = 'above';
  //stepperOrientation: Observable<StepperOrientation>;

  nombreGrupoAcordeon: string = null;
  clienteData: ClienteDatos;
  cliente_seleccionado: number = 1;
  id_solicitud_dc: number = 0;
  ID_TIPO_CLIENTE: number;
  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ROL_SOLICITANTE = GlobalSettings.ROL_SOLICITANTE;

  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService
    /* breakpointObserver: BreakpointObserver */
  ) {
    this.firstFormGroup = this._formBuilder.group({
      tipo_cliente: [this.cliente, this.ClientSelectorControl, Validators.required],
      nombreGrupo: [''],
      rucGrupo: [''],
      clienteCodigoSapEmpresa: [''],
      rucEmpresa: [''],
      clienteCodigoSapConsorcio: [''],
      rucConsorcio: [''],
    });
  }

  ngOnInit(): void {
    console.log("editar solicitud datos cliente--->" + this.id_solicitud_editar);
    if (this.id_solicitud_editar !== null) {
      this.obtenerSolicitud();
    }
    console.log("ngOnInit");
  }

  async listarGrupoEmpresarialxSolicitud(filtro: any) {
    this.solicitudService.listarGrupoEmpresarialxSolicitud(filtro).then(res => {
      console.log("listarGrupoEmpresarialxSolicitud--->" + JSON.stringify(res.payload));
      this.clienteData = res.payload;
    })

  }
  async listarConsorcioxSolicitud(filtro: any) {
    this.solicitudService.listarConsorcioxSolicitud(filtro).then(res => {
      console.log("listarConsorcioxSolicitud--->" + JSON.stringify(res.payload));
      this.clienteData = res.payload;
    })
  }

  async obtenerSolicitud() {
    this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then((data) => {
      console.log("datos cliente--->" + JSON.stringify(data));
      let solicitud: Solicitud = data.payload;
      switch (solicitud.id_tipo_cliente) {
        case 1:
          this.ClientSelectorControl.setValue(this.radioGrupo)
          this.cliente_seleccionado = this.radioGrupo;
          this.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud_editar });
          break;
        case 2:
          this.ClientSelectorControl.setValue(this.radioConsorcio)
          this.cliente_seleccionado = this.radioConsorcio;
          this.listarConsorcioxSolicitud({ id_solicitud: this.id_solicitud_editar });
          break;
        case 3:
          break;
      }
    })
  }

  seleccionCliente() {
    this.cliente_seleccionado = this.ClientSelectorControl.value;
    console.log("RADIO BOTTON-->" + this.cliente_seleccionado)
  }

  async openBuscarCoincidentes(data: any) {
    console.log('openBuscarCoincidentes--->' + JSON.stringify(data));
    data.tipo_cliente = this.cliente_seleccionado;
    switch (this.cliente_seleccionado) {
      case 1:
        console.log("Grupo Empresarial");
        if ((data.nombreGrupo==="" &&  data.rucGrupo==="")){
          console.log("esta vacio");
          break;
        }
  
        const dialogRef1 = this.matDialog.open(GruposCoincidentesDialogComponent, {
          disableClose: true,
          width: "500px",
          data: data
        });
        dialogRef1.afterClosed().subscribe(async result => {
          console.log("return Grupo dialogs-->" + JSON.stringify(result));
          if (result.resultado === 'CONFIRM_DLG_YES') {
            if (this.id_solicitud_editar === null) {
              this.crearSolicitud(result.grupo).then(async (id) => {
                this.id_solicitud_editar = id;
                this.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud_editar });
              });
            }else{
              this.actualizarSolicitud(result.grupo).then(async (id) => {
                this.id_solicitud_editar = id;
                this.listarGrupoEmpresarialxSolicitud({ id_solicitud: this.id_solicitud_editar });
              });
            }
          }
        });
        break;
      case 2:
        console.log("CONSORCIO");
        if (data.clienteCodigoSapConsorcio==="" && data.rucConsorcio){
          break;
        }
        const dialogRef2 = this.matDialog.open(ConsorciosCoincidentesDialogComponent, {
          disableClose: true,
          width: "500px",
          data: data
        });
        dialogRef2.afterClosed().subscribe(async result => {
          console.log("return Grupo dialogs-->" + JSON.stringify(result));
          if (result.resultado === 'CONFIRM_DLG_YES') {
            this.crearSolicitud(result.grupo).then(async (id) => {
              this.id_solicitud_editar = id;
              this.listarConsorcioxSolicitud({ id_solicitud: this.id_solicitud_editar });
            });
          }
        });
        break;

      case 3:
        if ((data.clienteCodigoSapEmpresa==="" &&  data.rucEmpresa==="")){
          console.log("esta vacio");
          break;
        }
  
        break;
    }
  }

  limpiarCampo(nombre: string) {
    this.firstFormGroup.get(nombre).setValue('');
  }


  async crearSolicitud(grupo: any): Promise<any> {
    let id_solicitud = null;
    let solicitud: Solicitud = this.mapeoSolicitud(grupo);
    return new Promise(
      (resolve, reject) => {
        this.solicitudService.crear(solicitud).then(async data => {
          console.log("se creo la solicitud-->" + JSON.stringify(data));
          id_solicitud = data.payload.id;
          this.id_solicitud_hija.emit(id_solicitud);
          resolve(id_solicitud)
        }).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      })
  }

  mapeoSolicitud(grupo: any) {
    let solicitud: Solicitud = {
      correlativo: null,
      id_estado: this.ESTADO_SOLICITUD_EN_SOLICITANTE,
      id_rol: this.ROL_SOLICITANTE,
      id_usuario: 12,
      id_usuario_creacion: 12,
      id_solicitud_referencia: null,
      sociedad_codigo_sap: null,
      id_cliente_agrupacion: grupo.id,
      id_empresa: null,
      id_tipo_cliente: this.cliente_seleccionado
    }
    return solicitud;
  }

  async actualizarSolicitud(grupo: any): Promise<any> {
    let id_solicitud = null;
    let solicitud: Solicitud = this.mapeoEditarSolicitud(grupo);
    console.log("mapeo-->"+JSON.stringify(solicitud));
    return new Promise(
      (resolve, reject) => {
        this.solicitudService.actualizarSolicitud(this.id_solicitud_editar, solicitud).then(async data => {
          console.log("se actualizo la solicitud-->" + JSON.stringify(data));
          id_solicitud = data.payload.id;
          this.id_solicitud_hija.emit(id_solicitud);
          resolve(id_solicitud)
        }).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      })
  }

  mapeoEditarSolicitud(grupo: any) {
    let solicitud: Solicitud = {
      id: this.id_solicitud_editar,
      correlativo: null,
      id_estado: this.ESTADO_SOLICITUD_EN_SOLICITANTE,
      id_rol: this.ROL_SOLICITANTE,
      id_usuario: 12,
      id_usuario_creacion: 12,
      id_solicitud_referencia: null,
      sociedad_codigo_sap: null,
      id_cliente_agrupacion: grupo.id,
      id_empresa: null,
      id_tipo_cliente: this.cliente_seleccionado
    }
    return solicitud;
  }
}
