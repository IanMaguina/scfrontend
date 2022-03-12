import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearEstrategiaSociedadComponent } from '../crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { CrearEstrategiaTipoPlanComponent } from '../crear-estrategia-tipo-plan/crear-estrategia-tipo-plan.component';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styles: [
  ]
})
export class EstrategiasComponent implements OnInit {
  listadoEstrategiasPorSociedad:any[] = [];
  listadoEstrategiasPorTipoPlan:any[] = [];
  displayedColumnsSociedad: string[] = ['sociedad', 'rol', 'usuario', 'revisor', 'id'];
  displayedColumnsPlan: string[] = ['nombre', 'plan', 'tipo', 'usuario', 'id'];
  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log("ngInit");
  }

  openAgregarEstrategiaSociedad(){
    const dialogRef = this.matDialog.open(CrearEstrategiaSociedadComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
    });



   }
  openAgregarEstrategiaTipoPlan(){ 
    const dialogRef2 = this.matDialog.open(CrearEstrategiaTipoPlanComponent, { 
      disableClose: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log("return function process");
    });



  }



  toggleEstrategiaEstadoPorSociedad(){
    console.log("toggleEstrategiaEstadoPorSociedad");
  }
  toggleEstrategiaEstadoPorTipoPlan(){
    console.log("toggleEstrategiaEstadoPorTipoPlan");
  }

}
