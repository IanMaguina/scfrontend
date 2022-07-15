import { Component, Input, OnInit } from '@angular/core';
import { SolicitudPlanService } from '@services/solicitud-plan.service';
import { SolicitudService } from '@services/solicitud.service';
import { ResumenRiesgoConsolidado } from 'src/app/models/resumen-riesgo-consolidado.interface';
import { ResumenRiesgo } from 'src/app/models/resumen-riesgo.interface';
import { ResumenRiesgoEstilo} from 'src/app/models/resumen-riesto-estilos';

const Resumen_Riesgo_Estilos: ResumenRiesgoEstilo[] = [
  {
    ClassName: 'list-item',
  },
  {
    ClassName: 'list-item2',
  },
  {
    ClassName: 'list-item3',
  }
]
@Component({
  selector: 'app-resumen-riesgos-sc',
  templateUrl: './resumen-riesgos-sc.component.html',
  styles: [
  ]
})
export class ResumenRiesgosScComponent implements OnInit {
  @Input() id_solicitud_editar: number;
  @Input() resumenDino?: ResumenRiesgo[]=[];
  @Input() resumenConsolidado?: ResumenRiesgoConsolidado;

  resumenRiesgo: ResumenRiesgoEstilo[] = Resumen_Riesgo_Estilos;
  selectedListItem: ResumenRiesgoEstilo;

  constructor(
    private solicitudPlanService: SolicitudPlanService
  ) { }

  ngOnInit(): void {
    console.log("mi id de solicitud--> "+this.id_solicitud_editar);
    this.listarResumenDino();
    this.listarResumenTotalGrupoPacasmayo();
    this.selectedListItem = null;
  }
  async listarResumenDino() {
    await this.solicitudPlanService.obtenerResumenRiesgos(this.id_solicitud_editar).then(res => {
      console.log("resumen riesgo: "+JSON.stringify(res));
      if(res.header.exito){
        this.resumenDino = res.payload;
      }else{
        this.resumenDino = [];
      }
     
    }); 
  }

  async listarResumenTotalGrupoPacasmayo() {
     await this.solicitudPlanService.obtenerConsolidadoRiesgos(this.id_solicitud_editar).then(res => {
      console.log("consolidado riesgo: "+JSON.stringify(res));
      if(res.header.exito){
        this.resumenConsolidado = res.payload[0];
      }
    }); 

  } 

   pintarCelda(dato: string):string{
    let style='';
    if(dato && dato ==='T'){
      style = 'color-warning';
    }
    return style;
  }


}
