import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanService } from '@services/plan.service';
import { EmpresaPlan } from 'src/app/models/empresa-plan.interface';
import { DlgNuevoPlanScComponent } from './dlg-nuevo-plan-sc/dlg-nuevo-plan-sc.component';

@Component({
  selector: 'app-datos-planes-sc',
  templateUrl: './datos-planes-sc.component.html',
  styles: [
  ]
})

export class DatosPlanesScComponent implements OnInit {

  @Input() id_solicitud_editar: number;
  empresaPlan: EmpresaPlan[];
  miGrupo : EmpresaPlan;

  constructor(
    private matDialog: MatDialog,
    private planService: PlanService,
  ) {

  }
  ngOnInit(): void {
    this.listarPlan();
  }

  openNuevoCredito() {
    const dialogRef = this.matDialog.open(DlgNuevoPlanScComponent, {
      disableClose: true,
      width: "750px",
      data: this.id_solicitud_editar,
      panelClass: 'custom_NPC'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        console.log("se agregó el plan correctamente");
      }
    });
  }

  mapeoAgrupacion(empresaPlan: any) {
    let empresa: EmpresaPlan = {
      nombre_cliente_agrupacion: empresaPlan.nombre_cliente_agrupacion ? empresaPlan.nombre_cliente_agrupacion : 'no registra',
      numero_documento_cliente_agrupacion: empresaPlan.numero_documento_cliente_agrupacion ? empresaPlan.numero_documento_cliente_agrupacion : 'no registra',
    }

    return empresa;
  }

  async listarPlan() {
    this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(data => {
      this.miGrupo = this.mapeoAgrupacion(data.payload[0]);
      
    });

  }

}
