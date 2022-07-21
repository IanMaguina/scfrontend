import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '@services/plan.service';
import { SolicitudPlan } from 'src/app/models/solicitud-plan.interface';
import { MatDialog } from '@angular/material/dialog';
import { DlgModificarPlanScComponent } from '../dlg-modificar-plan-sc/dlg-modificar-plan-sc.component';

@Component({
  selector: 'app-riesgos-sc',
  templateUrl: './riesgos-sc.component.html',
  styles: [
  ]
})
export class RiesgosScComponent implements OnInit {
  @Input() id_solicitud_editar: number;
  @Input() listadoRiesgos: SolicitudPlan[];
  //listadoRiesgos:  SolicitudPlan[] =[];

  displayedColumns: string[] = [
    'sociedad',
    'plan',
    'razon_social',
    'grupo_cliente',
    'linea_credito_actual',
    'documento_valorado_actual',
    'linea_solicitada',
    'moneda_solicitada',
    'documento_valorado_propuesto',
    'tipo_linea',
    'vigencia',
    'plan_control',
    'id'
  ]
  constructor(
    private planService:PlanService,
    private _snack:MatSnackBar,
    private matDialog: MatDialog,
    ) {

     }

  ngOnInit(): void {

      this.listarPlanSolicitudRiesgo();

  }

  listarPlanSolicitudRiesgo(){
    if(this.id_solicitud_editar){
    this.planService.listarPlanSolicitudRiesgo(this.id_solicitud_editar).then(data=>{
      this.listadoRiesgos = data.payload;
      console.log("listado Plan Riesgo"+ JSON.stringify(data.payload));
    })
  }
  }

  editarPlan(element) {
    console.log("editarPlan");
    this.openEditar(element);
  }


  openEditar(data?: any) {
    let dialogRef = this.matDialog.open(DlgModificarPlanScComponent, {
      disableClose: true,
      data: data ? data : '',
      panelClass: 'custom_EditarSolicitudPlan',
      autoFocus: false,
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack("Se actualizó solicitud");
        this.listarPlanSolicitudRiesgo();
      } else {
        this.listarPlanSolicitudRiesgo();
      }
    });
  }



  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
  updateRiesgos(data:any) {
    if(data=='CONFIRM_DLG_YES'){
      this.listarPlanSolicitudRiesgo();
    }
  }


}
