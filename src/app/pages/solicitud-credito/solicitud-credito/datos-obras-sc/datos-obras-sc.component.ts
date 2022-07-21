import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { SolicitudClienteObraDTO } from 'src/app/dto/solicitud-cliente-obra.dto';
import { Obra } from 'src/app/models/obra.interface';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

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

  userInfo: any;
  solicitud: Solicitud;
  ESTADO_SOLICITUD: number = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_REVISION: number = GlobalSettings.ESTADO_SOLICITUD_EN_REVISION;

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private _snack: MatSnackBar,
    private matDialog: MatDialog,
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
        this.ESTADO_SOLICITUD = this.solicitud.id_estado;
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
      
      if (data) {
        let obra_solicitud: Obra = await this.mapeoObra(data);
        this.solicitudService.asignarObra(obra_solicitud).then((response) => {
          if (response.header.exito) {
            this.enviarMensajeSnack("Se agregó la Obra");
            this.listarObras();
          }
        })
      }else{
        this.enviarMensajeSnack("No hay data en SAP");
      }
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
    console.log("arsaobra-->" + JSON.stringify(data));
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

  eliminarSolicitudObra(solicitudObra: any) {
    console.log("solicitud obra "+ JSON.stringify(solicitudObra));
    let data = {
      mensaje:'Está seguro de eliminar la obra?'
    }

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width:"300px",
      data:data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'CONFIRM_DLG_YES'){
        this.solicitudService.eliminarSolicitudObra(solicitudObra.id).then((res) => {
          if (res.header.exito) {
            this.enviarMensajeSnack("se eliminó la obra correctamente");
            this.listarObras();
          }
        }); 
      }else{
        this.listarObras();
      } 
    });

  }
  
  validaFechas(solicitudObra){

    const da1 = Date.parse(solicitudObra.fecha_inicio_atencion);
    const da2 = Date.parse(solicitudObra.fecha_fin_atencion);
    
    const do1 = Date.parse(solicitudObra.fecha_inicio_obra);
    const do2 = Date.parse(solicitudObra.fecha_fin_obra);

    console.log("da1="+da1);
    console.log("da2="+da2);    

    if (!da1){
       return  "Fecha de inicio de atencion es invalida.";
    }

    if (!da2){
      return "Fecha de fin de atencion es invalida.";
    }

    if (da1 < do1 || da1 > do2){
       console.log("fecha de inicio de atencion invalida...");
       
       return "Fecha de inicio de atencion es invalida.";
    } else

          if (da2 > do2 || da2 < do1){
            console.log("fecha de fin de atención invalida...");
            return "Fecha de fin de atención es invalida.";
          }

    return;
  }

  //actualizar obra
  async actualizarSolicitudObra(form: any) {
    console.log(JSON.stringify(form));
    let solicitudObra: SolicitudClienteObraDTO = await this.mapeoObra(form)

    console.log("solicitudObra="+ JSON.stringify(solicitudObra));

    const msg = this.validaFechas(solicitudObra)

    if (msg){
        this.callErrorDialog(msg);
        return;
    }
    
    this.solicitudService.actualizarSolicitudObra(solicitudObra).then((data) => {
      if (data.header.exito) {
        this.enviarMensajeSnack("se actualizó la obra correctamente");
        this.listarObras();
      }else{
        this.listarObras();
      }
    })
  }

  callErrorDialog(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: "400px",
      data: mensaje,
    });
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

}
