import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';

import { CrearCondicionPagoComponent } from '../../pages/crear-condicion-pago/crear-condicion-pago.component';
import { CondicionPagoRegularService } from '@services/condicion-pago-regular.service';

@Component({
  selector: 'app-condicion-pago',
  templateUrl: './condicion-pago.component.html',
  styleUrls: ['./condicion-pago.component.scss']
})
export class CondicionPagoComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private readonly condicionPagoRegularService: CondicionPagoRegularService) { }

  ngOnInit(): void {
  }


  public onCrearCondicionPagoRegular() {

    const dialogRef = this.dialog.open(CrearCondicionPagoComponent, { disableClose: true, autoFocus: false });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((response: boolean) => {
        if (response) {
          this.condicionPagoRegularService.getSearhCondicionPago();
        }
      })).subscribe();

  }

}
