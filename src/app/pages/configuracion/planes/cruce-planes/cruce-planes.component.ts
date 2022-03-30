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
    private _snack: MatSnackBar  ) {
    this.listarPlanes();
  }

  ngOnInit(): void {
    console.log("ngInit");

  }

  async listarPlanes() {
    this.planService.listarPlan().then(data => {
      let lista: any[] = [] = data.payload;
      this.listadoPlanes = [];
      lista.forEach(async item => {
        if (item.id !== this.plan.id) {
          let valor: any = {
            id: item.id,
            nombre: item.tipo_plancredito.nombre,
            seleccionar: false
          }
          this.listadoPlanes.push(valor);
        }
      })
      console.log(JSON.stringify(this.listadoPlanes));
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
      id:this.plan.id,
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
