import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plan } from 'src/app/models/plan.interface';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-cruce-planes',
  templateUrl: './cruce-planes.component.html',
  styles: [
  ]
})
export class CrucePlanesComponent implements OnInit {
  @Input() plan: Plan;
  informacionForm: any;

  displayedColumns: string[] = ['seleccionar', 'nombre'];
  //poner el model
  listadoPlanes: any[] = [];
  listadoPlanesSeleccionados: any[] = [];
  constructor(private planService: PlanService,
    private _snack: MatSnackBar) {
  }

  async ngOnInit() {
    console.log("ngInit");
    await this.listarPlanes();
    await this.listarCrucePlanes()

  }

  async listarPlanes() {
    this.planService.listarPlan().then(data => {
      console.log("listado de planes 1--->"+JSON.stringify(data.payload));
      let lista: any[] = data.payload;
      this.listadoPlanes = [];
      lista.forEach(async item => {
        if (item.id_tipo_plan_credito !== this.plan.id_tipo_plan_credito) {
          let valor: any = {
            id: item.tipo_plancredito.id,
            nombre: item.tipo_plancredito.nombre,
            seleccionar: false
          }
          this.listadoPlanes.push(valor);
        }
      })
      console.log("antes del cruce de planes-->" + JSON.stringify(this.listadoPlanes));
    })
  }

  async listarCrucePlanes() {
    this.planService.editarCruce(this.plan.id_tipo_plan_credito).then(data => {
      console.log(JSON.stringify(this.plan) + "-listado cruce de planes-->" + JSON.stringify(data.payload));
      let listaCruce: any[] = data.payload.plan_cruce;
      let auxLista: any[] = this.listadoPlanes;
      this.listadoPlanes = [];
      let listadoCrucePlan: any[] = [];
      console.log("auxLista--->" + JSON.stringify(auxLista));
      console.log("listaCruce--->" + JSON.stringify(listaCruce));

      if (listaCruce.length > 0) {
        auxLista.forEach(itemPlan => {
          listaCruce.forEach(async itemCruce => {
            if (itemCruce.id_plan_cruce === itemPlan.id) {
              let valor: any = {
                id: itemPlan.id,
                nombre: itemPlan.nombre,
                seleccionar: true
              }
              listadoCrucePlan.push(valor);
            } else {
              let valor: any = {
                id: itemPlan.id,
                nombre: itemPlan.nombre,
                seleccionar: false
              }
              listadoCrucePlan.push(valor);
            }
          })
        })
      } else {
        auxLista.forEach(itemPlan => {
          let valor: any = {
            id: itemPlan.id,
            nombre: itemPlan.nombre,
            seleccionar: false
          }
          listadoCrucePlan.push(valor);
        })
      }
      this.listadoPlanes = listadoCrucePlan;
      console.log("despues del cruce--->" + JSON.stringify(this.listadoPlanes));
    })
  }

  async guardarCrucePlanes() {
    let plan = await this.mapeoCruce()
    console.log("crear guardarCrucePlanes:" + JSON.stringify(plan));
    this.planService.guardarCruce(plan).then(() => {
      this._snack.open("Se guardo Cruce de Planes", 'cerrar', {
        duration: 1800,
        horizontalPosition: "end",
        verticalPosition: "top"
      });

    });
  }

  async mapeoCruce() {
    let cruce: any = {
      id: this.plan.id_tipo_plan_credito,
      cruce: this.retornarCrucePlanes()
    }
    return cruce;
  }


  onChangeCruce(element: any, event: any) {
    element.seleccionar = !element.seleccionar;
    console.log("element.seleccionar--->" + JSON.stringify(element.seleccionar));
    if (element.seleccionar) {
      console.log("element.seleccionar 2--->" + JSON.stringify(element.seleccionar));
      this.listadoPlanesSeleccionados.push(element);
    } else {
      let listado: any[] = this.listadoPlanesSeleccionados;
      this.listadoPlanesSeleccionados = listado.filter((item) => item.id !== element.id);
    }
    console.log("onChangeCruce--->" + JSON.stringify(this.listadoPlanesSeleccionados));
  }

  retornarCrucePlanes() {
    let cruce: any[] = this.listadoPlanesSeleccionados;
    let valor: any[] = [];
    cruce.forEach(item => {
      valor.push(item.id);
    })
    return valor;
  }
}
