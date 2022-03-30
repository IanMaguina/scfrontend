import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ConfigurarPlanComponent } from '../configurar-plan/configurar-plan.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';
import { PlanService } from './../../../../services/plan.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [
  ]
})
export class PlanesComponent implements OnInit {
  listadoPlanes: any[] = [];
  displayedColumnsSociedad: string[] = ['plan', 'activo'];
  constructor(
    private matDialog: MatDialog,
    private planService: PlanService

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarPlanes();
  }

  async listarPlanes() {
    this.planService.listarPlan().then(data => {
      this.listadoPlanes = data.payload;
      console.log(JSON.stringify(this.listadoPlanes));
    })
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
      width: '80%',
      data:element,
    });

    dialogRef2.afterClosed().subscribe(result => {
      this.listarPlanes();
      console.log("return function process");
    });
  }

  onchangeEstado(form:any){
    let mensaje:string;
    
    if(form.activo){
      mensaje = "¿Desea habilitar el plan?";
    }else{
      mensaje = "¿Desea deshabilitar el plan?";
    }
    form.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"400px",
      data:form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        console.log("return function process");
      }
      this.listarPlanes();
    });
  }



}
