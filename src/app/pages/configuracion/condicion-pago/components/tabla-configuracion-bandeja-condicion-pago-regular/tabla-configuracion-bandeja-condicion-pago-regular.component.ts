import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { takeUntil, tap, catchError, take } from 'rxjs/operators';

import { EditarCondicionPagoComponent } from '../../pages/editar-condicion-pago/editar-condicion-pago.component';

import { CondicionPagoRegularService } from '@services/condicion-pago-regular.service';
import { PopUPService } from '@services/pop-up.service';

@Component({
  selector: 'app-tabla-configuracion-bandeja-condicion-pago-regular',
  templateUrl: './tabla-configuracion-bandeja-condicion-pago-regular.component.html',
  styleUrls: ['./tabla-configuracion-bandeja-condicion-pago-regular.component.css']
})
export class TablaConfiguracionBandejaCondicionPagoRegularComponent implements OnInit {

  public displayedColumns = ['sociedad', 'grupo_cliente', 'linea_producto', 'condicion_pago_regular', 'activo'];
  public dataSource!: MatTableDataSource<any>;
  private destroy$ = new Subject<unknown>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private readonly condicionPagoRegularService: CondicionPagoRegularService,
    private readonly popUPService: PopUPService) { }

  ngOnInit(): void {
    this.getSearhCondicionPago();
    this.eventBuscarCondicionPagoRegular();
  }

  private getSearhCondicionPago(params?: HttpParams) {
    this.condicionPagoRegularService.getSearhCondicionPago(params).pipe(
      tap((request) => {
        const condicion_pago_regular = request.map((data) => ({ ...data }));
        this.dataSource = new MatTableDataSource(condicion_pago_regular);
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  private eventBuscarCondicionPagoRegular() {
    this.condicionPagoRegularService.eventBuscarCondicionPagoRegular$.pipe(
      tap((request) => this.getSearhCondicionPago(request)),
      takeUntil(this.destroy$)).subscribe();
  }


  public onEditarCondicionPagoRegular(condicionPagoRegular: any) {

    const { id, sociedad, grupo_cliente, linea_producto, valor } = condicionPagoRegular;

    const params: Object = {
      id,
      sociedad: `${sociedad.codigo_sap}-${sociedad.nombre}`,
      grupo_cliente: grupo_cliente.nombre,
      linea_producto: linea_producto.nombre,
      valor
    }

    const dialogRef = this.dialog.open(EditarCondicionPagoComponent, { disableClose: true, autoFocus: false, data: { params } });
    dialogRef.afterClosed().pipe(
      take(1),
      tap((response: boolean) => {
        if (response) {
          this.getSearhCondicionPago();
        }
      })).subscribe();

  }

  public onCambiarEstadoCondicionPagoRegular(id: number, event: MatSlideToggleChange) {

    const body: Object = {
      activo: event.checked
    }

    this.condicionPagoRegularService.updateCondicionPagoRegular(id, body).pipe(
      tap(({ header: { mensaje } }) => {
        this.popUPService.openPopPupAlertFunction(``, `${mensaje}`, 'Aceptar', (() => {
          this.getSearhCondicionPago();
        }));
      }),
      catchError((_) => {
        event.source.checked = !event.source.checked;
        this.popUPService.openPopPupAlert(``, `Ha ocurrido un error al intentar actualizar`, 'Cerrar');
        return of([]);
      })
    ).subscribe();

  }

}
