import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { SolicitudService } from '@services/solicitud.service';
import { AgrupacionClienteSolicitud } from 'src/app/models/agrupacion-cliente-solicitud.interface';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Usuario } from 'src/app/models/usuario.interface';
import { ConsorcioService } from 'src/app/services/consorcio.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';
import { AsignarIntegrantesComponent } from '../asignar-integrantes/asignar-integrantes.component';
import { CrearConsorcioComponent } from '../crear-consorcio/crear-consorcio.component';

const ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_APROBADO;
const ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO = GlobalSettings.ESTADO_SOLICITUD_GRUPO_CONSORCIO_PENDIENTE_ACTIVAR_NUEVO;
@Component({
  selector: 'app-consorcio',
  templateUrl: './consorcio.component.html',
  styles: [
  ]
})
export class ConsorcioComponent implements OnInit {
  listadoConsorcios: AgrupacionClienteSolicitud[] = [];

  displayedColumns: string[] = [
    'razonsocial',
    'numero_documento',
    'sociedad',
    'pendiente',
    'solicitante',
    'estado',
    'id'
  ];

  userInfo: Usuario;
  id_usuario: number = 0;
  id_perfilLogueo: number = 0;
  PERFIL_ADMINISTRADOR:number = GlobalSettings.PERFIL_ADMINISTRADOR;
  isPerfilAdmin:boolean=false;
  formulary:FormGroup;

  constructor(
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private consorcioService: ConsorcioService,
    private _formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private autenticacionService: AutenticacionService
  ) {
    this.formulary = this._formBuilder.group({
      rucConsorcio: [''],
    });
  }

  ngOnInit(): void {
    this.userInfo = this.autenticacionService.getUserInfo();
    this.id_usuario=this.userInfo.id;
    this.listarConsorcios();
    this.isAdmin();
  }

  async listarConsorcios() {
    //this.consorcioService.listarConsorcios().then(data => {
    this.consorcioService.buscarConsorcios().then(data => { 
      this.listadoConsorcios = data.payload;
    })
  }

  openAgregarConsorcio() {
    let dialogRef = this.matDialog.open(CrearConsorcioComponent, {
      disableClose: true,
      width: '300px',
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.payload.confirm === 'CONFIRM_DLG_YES') {
          this.openAsignarIntegrantes(result.payload.data);
      } else {
        this.listarConsorcios();

      }
    });
  }

  openAsignarIntegrantes(id: any) {
    this.openDialog(AsignarIntegrantesComponent, 'no', '80%', id, 'custom_ConsorcioDialog');
  }

  toggleConsorcioActivo(element: any) {
    let mensaje: string;

    if (element.activo) {
      mensaje = "¿Desea habilitar el consorcio?";
    } else {
      mensaje = "¿Desea deshabilitar el consorcio?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element,
    });

    dialogRef3.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let clienteAgrupacion: ClienteAgrupacion = element;
        clienteAgrupacion.id_usuario=this.id_usuario;
        this.consorcioService.eliminarConsorcio(clienteAgrupacion).then(()=>{
          this.listarConsorcios();
        });

      }
    });

  }

  openDialog(componente: any, msg: string, width: string, data?: any, panelClass?: string) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width: width,
      data: data ? data : '',
      panelClass: panelClass? panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        if (msg != 'no') {
          this.enviarMensajeSnack(msg);
          this.listarConsorcios();
        }else{
          this.listarConsorcios();
        }
      } else {
        this.listarConsorcios();

      }
    });
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  isAdmin(){
    if(this.id_perfilLogueo===this.PERFIL_ADMINISTRADOR){
      this.isPerfilAdmin = true;
    }
  }

  listarConsorcioxFiltros() {
    let rucConsorcio = this.formulary.get('rucConsorcio').value;
    console.log("rucConsorcio"+JSON.stringify(rucConsorcio));
    let filtroConsorcio = {
      numero_documento: rucConsorcio
    }

    this.consorcioService.filtrarConsorcios(filtroConsorcio).then((data) => {
      console.log("Listado de Consorcios-->" + JSON.stringify(data))
      this.listadoConsorcios = data.payload;

    })
  }


}
