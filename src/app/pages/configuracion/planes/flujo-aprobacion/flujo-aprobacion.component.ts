import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'src/app/models/plan.interface';
import { PlanService } from 'src/app/services/plan.service';
import { AsignarAprobadoresComponent } from '../asignar-aprobadores/asignar-aprobadores.component';

@Component({
  selector: 'app-flujo-aprobacion',
  templateUrl: './flujo-aprobacion.component.html',
  styles: [
  ]
})
export class FlujoAprobacionComponent implements OnInit {
  @Input() plan: Plan;
  listadoTipoFlujoAprobacion: any[] = [];
  displayedColumns: string[] = ['documentovalorado', 'aprobadores'];

  constructor(
    private matDialog: MatDialog,
    private planService: PlanService
  ) {
    
  }

  async ngOnInit() {
    await this.listarPlanDocumentoValorado();
  }

  async listarPlanDocumentoValorado() {
    this.listadoTipoFlujoAprobacion=[];
    this.planService.listarPlanDocumentoValoradoAprobador(this.plan.id).then(data => {
      let aux: any[] = data.payload;
      aux.forEach(item => {
        
        let aprobadores: any[] = (item.aprobadores.length>0 ? item.aprobadores:[]);
        console.log("aprobadoresarsa-->" + JSON.stringify(aprobadores));
        let usuarios: string = "";
        aprobadores.forEach(apro => {
          console.log("hola111-->"+JSON.stringify(apro.usuario===null?"":apro.usuario.nombre));
          let nom=(apro.usuario===null?"":apro.usuario.nombre);
          usuarios=usuarios.concat((nom===""?"":","),nom);
          console.log("usuarios-->"+usuarios);
          //usuarios.concat(usuarios,(apro.usuario===null?"":apro.usuario.nombre));
        })
        let tipoFlujo = {
          //tipo_documentovalorado:item.tipo_documentovalorado,
          id: item.tipo_documentovalorado.id,
          documentovalorado: item.tipo_documentovalorado.nombre,
          aprobadores: usuarios
        }
        this.listadoTipoFlujoAprobacion.push(tipoFlujo);
      })
      console.log("listarPlanDocumentoValorado-->" + JSON.stringify(this.listadoTipoFlujoAprobacion));
    });
  }


  editarAprobadores(element: any) {
    let item = {
      plan: 1,
      documento: element.id
    }
    const dialogRef2 = this.matDialog.open(AsignarAprobadoresComponent, {
      disableClose: true,
      width: '60%',
      data: item,
    });

    dialogRef2.afterClosed().subscribe(result => {
      /* listar documentos - aprobadores actualizados */
      console.log("return function process");
    });
  }

}
