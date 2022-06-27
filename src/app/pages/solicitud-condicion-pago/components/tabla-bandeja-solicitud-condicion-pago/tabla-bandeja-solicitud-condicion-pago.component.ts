import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, switchMap, tap } from 'rxjs/operators';

import { CondicionPagoService } from '@services/condicion-pago.service';

import { CondicionPagoCliente } from 'src/app/models/condicion_pago_cliente.interface';
import { Estado } from 'src/app/models/estado.interface';
import { Subject } from 'rxjs';

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

  constructor(private readonly condicionPagoService: CondicionPagoService) { }

  ngOnInit(): void {
    this.getCondicionPagoCliente();
    this.eventBuscarCondicionPago();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private getCondicionPagoCliente() {
    this.condicionPagoService.getCondicionPagoCliente().pipe(
      tap((request) => {
        const solicitudes = request.map((data) => ({ ...data }));
        this.dataSource = new MatTableDataSource(solicitudes);
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  private eventBuscarCondicionPago() {
    this.condicionPagoService.eventBuscarCondicionPago$.pipe(
      switchMap((request) => this.condicionPagoService.getCondicionPagoCliente(request)),
      takeUntil(this.destroy$)).subscribe();
  }

}
