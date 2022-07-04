import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpConfirm, PopUpAlert} from '../shared/interfaces/pop-up-interface';
import { AlertPopUpComponent } from '../shared/pop-up/alert-pop-up/alert-pop-up.component';
import { ConfirmPopUpComponent } from '../shared/pop-up/confirm-pop-up/confirm-pop-up.component';

@Injectable()

export class PopUPService {

  constructor(private dialog: MatDialog) { }

  popPupAlertFunction(title: string, message: string, closeButtonLabel: string, callBackFunction: Function) {
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      disableClose: true,
      width: '300px',
      data: new PopUpAlert({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }

  popPupAlert(title: string, message: string, closeButtonLabel: string) {
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      disableClose: true,
      width: '300px',
      data: new PopUpAlert({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });

    dialogRef.afterClosed().subscribe(result => result);
  }

  popPupConfirm(title: string, message: string, callBackFunction: Function, buttonClose: string = 'no', buttonAcepted: string = 'si') {
    const dialogRef = this.dialog.open(ConfirmPopUpComponent, {
      data: new PopUpConfirm({
        title: title,
        content: message,
        buttonClose: buttonClose,
        buttonAcepted: buttonAcepted
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }

  openPopPupAlertFunction(title: string, message: string, closeButtonLabel: string, callBackFunction: Function) {
    this.popPupAlertFunction(title, message, closeButtonLabel, callBackFunction);
  }

  openPopPupAlert(title: string, message: string, closeButtonLabel: string) {
    this.popPupAlert(title, message, closeButtonLabel);
  }
}
