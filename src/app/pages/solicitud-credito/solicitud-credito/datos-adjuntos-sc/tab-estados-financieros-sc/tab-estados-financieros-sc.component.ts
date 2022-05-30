import { SolicitudAdjuntoService } from './../../../../../services/solicitud-adjunto.service';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tab-estados-financieros-sc',
  templateUrl: './tab-estados-financieros-sc.component.html',
  styles: [
  ]
})
export class TabEstadosFinancierosScComponent implements OnInit {
  @Input() id_solicitud: string;

  adjuntarfinancieros: number = 1;
  motivofinancieros: number = 2;
  estadosfinancieros = new FormControl('auto');
  constructor(private solicitudAdjuntoService:SolicitudAdjuntoService) { }

  ngOnInit(): void {
  }


  async selectFileAnexo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const name = event.target.files[0].name;
      console.log("el nombre es : " + name);
      this.grabarAnexo(file, name);
    }

  }
  async grabarAnexo(archivo: File, filename: string) {
    this.solicitudAdjuntoService.crear(archivo, this.id_solicitud, filename)
      .then(result => {
        if (result.resultado == 1) {
/*           this._snack.open(this.MENSAJE_CARGAR_ANEXO_SOLICITUD, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });

          this.getListaAnexos(this.id_solicitud);
          this.dialogForm.get('fileAnexoSolicitud').reset(); */
        }
      }).catch(error => {
        console.debug("errors when trying to add Document....");
      })
  }

}
