import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';
import { Empresa } from 'src/app/models/empresa.interface';
import { SolicitudCliente } from 'src/app/models/solicitud-cliente.interface';
import { Zonal } from 'src/app/models/zonal.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ZonalService } from 'src/app/services/zonal.service';

@Component({
  selector: 'app-datos-empresa-sc',
  templateUrl: './datos-empresa-sc.component.html',
  styles: [
  ]
})
export class DatosEmpresaScComponent implements OnInit {
  @Input() clienteData: ClienteDatos;
  @Input() id_solicitud_editar: number;
  formulary: FormGroup;
  listaConsorciados: any = [];
  listadoZonales: Zonal[] = [];
  solicitudCliente:SolicitudCliente;
  formErrors = {
    'sustento_comercial': '',
    'zonal_codigo_sap': '',
    'telefono': '',
    'correo': '',

  }
  validationMessages = {
    'sustento_comercial': {
      'required': 'el sustento_comercial es requerido.'
    },
    'zonal_codigo_sap': {
      'required': 'el zonal_codigo_sap es requerido.'
    },
    'telefono': {
      'required': 'el telefono es requerido.'
    },
    'correo': {
      'required': 'el correo es requerido.'
    },

  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private zonalService: ZonalService,
    private solicitudService: SolicitudService,
    private _snack: MatSnackBar
  ) {
    this.formulary = this.formBuilder.group({
      sustento_comercial: ['',],
      zonal_codigo_sap: [''],
      telefono: [''],
      correo: [''],
    });
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(){
    this.listarZonales();
    console.log("clienteData---->"+JSON.stringify(this.clienteData));
    if (this.id_solicitud_editar){
      this.solicitudService.listarSolicitudCliente(this.id_solicitud_editar).then(async res => {
        if (res.payload.length>0){
          this.solicitudCliente=res.payload[0];
          this.formulary.get("zonal_codigo_sap").setValue(this.solicitudCliente.zonal_codigo_sap);
        }
        //this.clienteData = res.payload;
        console.log("solicitudCliente--->"+JSON.stringify(this.solicitudCliente));
      })
    }
  }

  async listarZonales() {
    await this.zonalService.listarZonales().then((dato) => {
      this.listadoZonales = dato;
    })
  }

  async guardarDatosEmpresa(form: any) {
    console.log("guardarDatosEmpresa..:" + JSON.stringify(form));
    let solicitudCliente: SolicitudCliente = await this.mapeoData(form);
    this.solicitudService.actualizarSolicitudCliente(solicitudCliente).then((data)=>{
      if(data.header.exito){
        this.enviarMensajeSnack("Se guardaron los cambios");
      }else{
        console.log("Error guardarSeccionGrupo:"+JSON.stringify(data));
      }
    });
  }

  async mapeoData(obj: SolicitudCliente) {
    let solicitudCliente: SolicitudCliente = {
      id: this.solicitudCliente.id,
      sustento_comercial: obj.sustento_comercial,
      zonal_codigo_sap: obj.zonal_codigo_sap,
      telefono: obj.telefono,
      correo: obj.correo
    }
    return solicitudCliente;
  }

  enviarMensajeSnack(mensaje:string){
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
}
