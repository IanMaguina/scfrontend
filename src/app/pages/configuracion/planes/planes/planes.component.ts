import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '@services/snack-bar.service';
import { Plan } from 'src/app/models/plan.interface';
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
    private planService: PlanService,
    private _snack: SnackBarService,

  ) { }

  ngOnInit(): void {
    
    this.listarPlanes();
  }

  async listarPlanes() {
    this.planService.listarPlan().then(data => {
      this.listadoPlanes = data.payload;
     // console.log(JSON.stringify(this.listadoPlanes));
    })
  }

  openAgregarPlan(){
    const dialogRef = this.matDialog.open(CrearPlanComponent, {
      disableClose: true,
      panelClass: 'custom_Config',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        this._snack.openSnackBar('Plan Creado','Cerrar');
        this.listarPlanes();
      }else{

        this.listarPlanes();
      }

    });
  }
  openConfigurarPlan(element:any){
    const dialogRef2 = this.matDialog.open(ConfigurarPlanComponent, {
      disableClose: true,
      data:element,
      panelClass: 'custom_ConfigPlan'
    });

    dialogRef2.afterClosed().subscribe( (_) => {
      this.listarPlanes();
      
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
      data:form,
    });

    dialogRef3.afterClosed().subscribe(result => {
    // console.log("el form plan que enviamos:"+JSON.stringify(form));
      let item: Plan = {
        id: form.id,
        activo: form.activo, 
      }; 
      if(result==='CONFIRM_DLG_YES'){
        this.planService.actualizarPlan(item).then(data => {
          if(data.header.exito){
            this._snack.openSnackBar(data.header.mensaje,'Cerrar');
            this.listarPlanes();
          }else{
            this.listarPlanes();
          }

        }); 
        this.listarPlanes();
      }else{
        this.listarPlanes();
      }
    });
  }



}
