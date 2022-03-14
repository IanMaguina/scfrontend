import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearEstrategiaSociedadComponent } from '../crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { CrearEstrategiaTipoPlanComponent } from '../crear-estrategia-tipo-plan/crear-estrategia-tipo-plan.component';
import {EstrategiaService} from '../../../../services/estrategia.service';
import { EditarEstrategiaSociedadComponent } from '../editar-estrategia-sociedad/editar-estrategia-sociedad.component';
@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styles: [
  ]
})
export class EstrategiasComponent implements OnInit {
  listadoEstrategiasPorSociedad: any[] = [];
  listadoEstrategiasPorTipoPlan: any[] = [];
  displayedColumnsSociedad: string[] = ['sociedad', 'rol', 'usuario', 'revisor', 'activo'];
  displayedColumnsPlan: string[] = ['nombre', 'plan', 'tipo', 'usuario', 'id'];
  constructor(
    private matDialog: MatDialog,
    private estrategiaService:EstrategiaService
  ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarEstrategias();
  }

  async listarEstrategias() {
    this.estrategiaService.listarEstrategias().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoEstrategiasPorSociedad = data.payload;
    })
  }

  openAgregarEstrategiaSociedad() {
    const dialogRef = this.matDialog.open(CrearEstrategiaSociedadComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarEstrategias();
      console.log("return function process");
    });
  }

  openEditarEstrategiaSociedad(element:any) {
    const dialogRef = this.matDialog.open(EditarEstrategiaSociedadComponent, {
      disableClose: true,
      data: { estrategia: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarEstrategias();
      console.log("return function process");
    });
  }
    
  openAgregarEstrategiaTipoPlan() {
    const dialogRef2 = this.matDialog.open(CrearEstrategiaTipoPlanComponent, {
      disableClose: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log("return function process");
    });
  }

  async toggleEstrategiaEstadoPorSociedad(element:any) {
    console.log("toggleEstrategiaEstadoPorSociedad: "+JSON.stringify(element));
    await this.estrategiaService.inactivarEstrategia(element.id).then( (_) =>{
      this.listarEstrategias();
    });

  }
  toggleEstrategiaEstadoPorTipoPlan() {
    console.log("toggleEstrategiaEstadoPorTipoPlan");
  }

}
