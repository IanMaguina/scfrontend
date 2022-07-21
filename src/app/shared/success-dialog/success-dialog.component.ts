import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  mensaje:string;
  detalle:string;
  adicional:string;
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.mensaje = data.mensaje;
    this.detalle = (data.detalle?data.detalle:'');
    this.adicional = (data.adicional?data.adicional:'');
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  onNoClick(res:string){
    this.dialogRef.close(res);
  }
}
