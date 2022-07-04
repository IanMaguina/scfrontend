import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpAlert } from '../../interfaces/pop-up-interface';

@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrls: ['./alert-pop-up.component.css']
})
export class AlertPopUpComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PopUpAlert
  ) { }

}
