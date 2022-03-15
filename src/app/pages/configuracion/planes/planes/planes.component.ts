import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurarPlanComponent } from '../configurar-plan/configurar-plan.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [
  ]
})
export class PlanesComponent implements OnInit {
  listadoPlanes: any[] = [
    {id:1, nombre:"PLan 1"},
    {id:2, nombre:"PLan 2"},
    {id:3, nombre:"PLan 3"},
    {id:4, nombre:"PLan 4"},
  ];
  displayedColumnsSociedad: string[] = ['id', 'plan'];
  constructor(
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
  }
  listarPlanes(){
    console.log("listarPlanes");
  }
  openAgregarPlan(){
    const dialogRef = this.matDialog.open(CrearPlanComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPlanes();
      console.log("return function process");
    });
  }
  openConfigurarPlan(element:any){
    const dialogRef2 = this.matDialog.open(ConfigurarPlanComponent, {
      disableClose: true,
      width: '60%',
      data:element.id,
    });

    dialogRef2.afterClosed().subscribe(result => {
      this.listarPlanes();
      console.log("return function process");
    });
  }



}
