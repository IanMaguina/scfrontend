import { Component, Input, OnInit } from '@angular/core';
import { SolicitudPlanService } from '@services/solicitud-plan.service';
import { SolicitudService } from '@services/solicitud.service';
import { ResumenRiesgoConsolidado } from 'src/app/models/resumen-riesgo-consolidado.interface';
import { ResumenRiesgo } from 'src/app/models/resumen-riesgo.interface';

@Component({
  selector: 'app-resumen-riesgos-sc',
  templateUrl: './resumen-riesgos-sc.component.html',
  styles: [
  ]
})
export class ResumenRiesgosScComponent implements OnInit {
  @Input() id_solicitud_editar: number;
  listadoResumenDino: ResumenRiesgo[] = [];
  listadoResumenDisac: ResumenRiesgo[] = [];
  listadoResumenTotalPacasmayo: ResumenRiesgoConsolidado[] = [];


  constructor(
    private solicitudPlanService: SolicitudPlanService
  ) { }

  ngOnInit(): void {
    this.listarResumenDino();
    this.listarResumenTotalGrupoPacasmayo();
  }
  listarResumenDino() {
    this.solicitudPlanService.obtenerResumenRiesgos(this.id_solicitud_editar).then(res => {
      this.listadoResumenDino = res.payload;
    });
  }

  listarResumenTotalGrupoPacasmayo() {

    this.solicitudPlanService.obtenerConsolidadoRiesgos(this.id_solicitud_editar).then(res => {
      this.listadoResumenTotalPacasmayo = res.payload;
    });

  } 


}
