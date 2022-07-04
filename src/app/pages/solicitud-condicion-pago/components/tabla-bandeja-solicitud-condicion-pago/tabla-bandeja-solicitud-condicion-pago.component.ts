import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CondicionPagoService } from '@services/condicion-pago.service';

//import { CondicionPagoCliente } from 'src/app/models/condicion_pago_cliente.interface';

@Component({
  selector: 'app-tabla-bandeja-solicitud-condicion-pago',
  templateUrl: './tabla-bandeja-solicitud-condicion-pago.component.html',
  styleUrls: ['./tabla-bandeja-solicitud-condicion-pago.component.css']
})
export class TablaBandejaSolicitudCondicionPagoComponent implements OnInit, OnDestroy {

  public displayedColumns = ['solicitud', 'ruc', 'razon_social', 'grupo_cliente', 'fecha_solicitud'];
  public dataSource!: MatTableDataSource<any>;
  private destroy$ = new Subject<unknown>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private readonly condicionPagoService: CondicionPagoService) { }

  ngOnInit(): void {
    this.getCondicionPagoCliente();
    this.eventBuscarCondicionPago();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private getCondicionPagoCliente(params?: HttpParams) {
    this.condicionPagoService.getSearchCondicionPagoCliente(params).pipe(
      tap((request) => {
        const solicitudes = request.map((data) => ({ ...data }));
        this.dataSource = new MatTableDataSource(solicitudes);
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  private eventBuscarCondicionPago() {
    this.condicionPagoService.eventBuscarCondicionPago$.pipe(
      tap((request) => this.getCondicionPagoCliente(request)),
      takeUntil(this.destroy$)).subscribe();
  }

  public onDetalleCondicionPago(id: number) {
    this.router.navigate(["app/solicitudcondicionpago/detalle-condicion-pago", id]);
  }


}
