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
    if (this.id_solicitud_editar!==null){
      this.obtenerSolicitud();
    }
    console.log("ngOnInit");
  }

  obtenerSolicitud() {
    this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then((data) => {
      console.log("datos cliente--->"+JSON.stringify(data));
      let solicitud: Solicitud = data.payload;
      switch (solicitud.id_tipo_cliente) {
        case 1:
          this.ClientSelectorControl.setValue(this.radioGrupo)
          this.cliente_seleccionado=this.radioGrupo;
          this.solicitudService.listarGrupoEmpresarialxSolicitud({id_solicitud:this.id_solicitud_editar}).then(res=>{
            console.log("listarGrupoEmpresarialxSolicitud--->"+JSON.stringify(res.payload));
            this.clienteData=res.payload;
          })

          //this.clienteData = result.grupo.empresa;
          break;
        case 2:
          break;
        case 3:
          break;
      }
    })
 }

  guardarSeccionInformacion(element: any) {
    console.log("guardarSeccionInformacion");
  }

  seleccionCliente() {
    this.cliente_seleccionado = this.ClientSelectorControl.value;
  }

  async openBuscarCoincidentes(data: any) {
    console.log(JSON.stringify(data));
    this.cliente_seleccionado = data.tipo_cliente;
    switch (this.cliente_seleccionado) {
      case 1:
        console.log("Grupo Empresarial");
        const dialogRef1 = this.matDialog.open(GruposCoincidentesDialogComponent, {
          disableClose: true,
          width: "400px",
          data: data
        });
        dialogRef1.afterClosed().subscribe(async result => {
          console.log("return Grupo dialogs-->" + JSON.stringify(result));
          if (result.resultado === 'CONFIRM_DLG_YES') {
            this.nombreGrupoAcordeon = "";
            this.solicitudService.listarGrupoEmpresarialxSolicitud({id_solicitud:result.solicitud.id}).then(res=>{
              console.log("listarGrupoEmpresarialxSolicitud--->"+JSON.stringify(res.payload));
              this.clienteData=res.payload;
            })
  
            //this.clienteData = result.grupo.empresa;
            this.id_solicitud_hija.emit(result.solicitud.id);
          }

        });
        break;
      case 2:
        console.log("CONSORCIO");
        const dialogRef2 = this.matDialog.open(ConsorciosCoincidentesDialogComponent, {
          disableClose: true,
          width: "400px",
          data: data
        });
        dialogRef2.afterClosed().subscribe(async result => {
          console.log("return Grupo dialogs-->" + JSON.stringify(result));
          if (result.resultado === 'CONFIRM_DLG_YES') {
            this.nombreGrupoAcordeon = "";
            this.solicitudService.listarGrupoEmpresarialxSolicitud({id_solicitud:result.solicitud.id}).then(res=>{
              console.log("listarGrupoEmpresarialxSolicitud--->"+JSON.stringify(res.payload));
              this.clienteData=res.payload;
            })
  
            //this.clienteData = result.grupo.empresa;
            this.id_solicitud_hija.emit(result.solicitud.id);
          }

        });
        break;

      case 3:
        console.log("Individual");
        break;
    }
  }

  limpiarCampo(nombre: string) {
    this.firstFormGroup.get(nombre).setValue('');
  }
}
