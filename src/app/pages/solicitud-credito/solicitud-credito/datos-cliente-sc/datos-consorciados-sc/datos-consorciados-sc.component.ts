import { Component, Input, OnInit } from '@angular/core';
import { ClienteDatos } from 'src/app/models/cliente-datos.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-datos-consorciados-sc',
  templateUrl: './datos-consorciados-sc.component.html',
  styles: [
  ]
})
export class DatosConsorciadosScComponent implements OnInit {
  @Input() clienteData: ClienteDatos;
  @Input() id_solicitud: number;

  constructor(
    private solicitudService: SolicitudService,
  ) { }

  ngOnInit(): void {
    console.log("data de consorciados-->" + JSON.stringify(this.clienteData));
    console.log("ngOnInit");
    if (this.id_solicitud) {
      this.solicitudService.listarConsorcioxSolicitud({ id_solicitud: this.id_solicitud }).then(res => {
        this.clienteData = res.payload;
        console.log("desde datos grupo-->" + JSON.stringify(this.clienteData.solicitud_cliente));
      })
    }
  }

}
