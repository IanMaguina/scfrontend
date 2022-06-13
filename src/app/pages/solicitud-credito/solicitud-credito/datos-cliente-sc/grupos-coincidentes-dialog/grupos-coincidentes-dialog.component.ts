import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { ClienteAgrupacion } from '../../../../../models/cliente-agrupacion.interface';
import { SolicitudService } from '../../../../../services/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';
@Component({
  selector: 'app-grupos-coincidentes-dialog',
  templateUrl: './grupos-coincidentes-dialog.component.html',
  styles: [
  ]
})
export class GruposCoincidentesDialogComponent implements OnInit {
  listaGrupos: ClienteAgrupacion[] = [];
  nodata: boolean = false;
  nombre: string;
  rucIntegrante: string;
  displayedColumns: string[] = [
    'sociedad',
    'razon_social',
  ];
  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ROL_SOLICITANTE = GlobalSettings.ROL_SOLICITANTE;
  constructor(
    public dialogRef: MatDialogRef<GruposCoincidentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService: SolicitudService
  ) {
    this.nombre = data.nombreGrupo;
    this.rucIntegrante = data.rucGrupo;
  }

  ngOnInit() {
    if (this.nombre) {
      this.listarGrupoEmpresarialxFiltros({ nombre: this.nombre });
    } else {
      this.listarGrupoEmpresarialxFiltros({ numero_documento: this.rucIntegrante });

    }
  }

  listarGrupoEmpresarialxFiltros(filtro: any) {
    this.solicitudService.listarGrupoEmpresarialxFiltros(filtro).then((data) => {
      console.log("Listado de grupos empresariales-->" + JSON.stringify(data.payload))
      this.listaGrupos = data.payload;
      if (data.payload.length === 0) {
        this.nodata = true;
      }
    })
  }

  async guardarSolicitud(grupo: any) {
    this.cerrarDialog({ resultado: "CONFIRM_DLG_YES", grupo: grupo });
  }

  cerrarDialog(grupo: any) {
    this.dialogRef.close(grupo);
  }

}
