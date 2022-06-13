import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanService } from '@services/plan.service';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { Empresa } from 'src/app/models/empresa.interface';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { Zonal } from 'src/app/models/zonal.interface';
import { DlgNuevoPlanScComponent } from './dlg-nuevo-plan-sc/dlg-nuevo-plan-sc.component';

export interface EmpresaPlan {
  id?: number,
  id_solicitud?: number,
  solicitud?: Solicitud,
  id_cliente_agrupacion?: number,
  cliente_agrupacion?: ClienteAgrupacion,
  id_empresa?: number,
  empresa?: Empresa,
  zonal_codigo_sap?: string,
  zonal?: Zonal,
  correo?: string,
  nombre_cliente_agrupacion?: string,
  id_documento_identidad_cliente_agrupacion?: number,
  numero_documento_cliente_agrupacion?: string,
  id_documento_identidad?: number,
  numero_documento?: string,
  razon_social?: string,
  telefono?: string,
  sustento_comercial?: string,
  participacion?: number
}

@Component({
  selector: 'app-datos-planes-sc',
  templateUrl: './datos-planes-sc.component.html',
  styles: [
  ]
})

export class DatosPlanesScComponent implements OnInit {
 
  @Input() id_solicitud_editar: number;
  empresaPlan: EmpresaPlan[];
  
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
      data: this.id_solicitud_editar
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'CONFIRM_DLG_YES') {

        console.log("se agregó el plan correctamente");
      }
    });
  }

  listarPlan() {
    this.planService.listarPlanEmpresa(this.id_solicitud_editar).then(data => {
      this.empresaPlan = data.payload;
    })
  }

}
