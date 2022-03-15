import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-configurar-plan',
  templateUrl: './configurar-plan.component.html',
  styles: [
  ]
})
export class ConfigurarPlanComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfigurarPlanComponent>,
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
