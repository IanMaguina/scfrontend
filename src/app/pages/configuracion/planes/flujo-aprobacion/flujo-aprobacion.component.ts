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
  listadoTipoFlujoAprobacion: any[] = [];// [{"id":1,"documentovalorado":"Cheque","aprobadores":",Fernando Barrios,usuario A"},{"id":2,"documentovalorado":"Pagare","aprobadores":""}];
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
    let listado: any[] = [];
    await this.planService.listarPlanDocumentoValoradoAprobador(this.plan.id).then(data => {
      console.log("listarPlanDocumentoValoradoAprobador-->" + JSON.stringify(data));
      if (data.header.exito) {
        let aux: any[] = data.payload;
        aux.forEach(item => {
          let aprobadores: any[] = (item.aprobadores.length > 0 ? item.aprobadores : []);
          let usuarios: string = "";
          let id_plan_documentovalorado: number = null;
          aprobadores.forEach(apro => {
            let nom = (apro.usuario === null ? "" : apro.usuario.nombre);
            usuarios = usuarios.concat(nom, (nom === "" ? "" : ","));
            id_plan_documentovalorado = apro.id_plan_documentovalorado;
            console.log("usuarios-->" + usuarios);
          })
          let tipoFlujo = {
            id: item.tipo_documentovalorado.id,
            documentovalorado: item.tipo_documentovalorado.nombre,
            aprobadores: usuarios,
            id_plan_documentovalorado: id_plan_documentovalorado,
            listado_aprobadores: item.aprobadores
          }
          listado.push(tipoFlujo);
        })
      }
      this.listadoTipoFlujoAprobacion = listado;
      console.log("listadoTipoFlujoAprobacion-->" + JSON.stringify(this.listadoTipoFlujoAprobacion));
    });
  }


  editarAprobadores(element: any) {
    const dialogRef2 = this.matDialog.open(AsignarAprobadoresComponent, {
      disableClose: true,
      width: '60%',
      data: element.id_plan_documentovalorado,
    });

    dialogRef2.afterClosed().subscribe(result => {
      /* listar documentos - aprobadores actualizados */
      console.log("return function process");
    });
  }

}
