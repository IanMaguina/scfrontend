import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpConfirm } from '../../interfaces/pop-up-interface';

@Component({
  selector: 'app-confirm-pop-up',
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.scss']
})
export class ConfirmPopUpComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PopUpConfirm
  ) { }

  ngOnInit(): void {
  }

}
