import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-configurar-plan',
  templateUrl: './configurar-plan.component.html',
  styles: [
  ]
})
export class ConfigurarPlanComponent implements OnInit {
  nombreplan:string ='plan de prueba';
  informacionForm: any;
  

  constructor(
    public dialogRef: MatDialogRef<ConfigurarPlanComponent>,
    
  ) { 
    

  }

  ngOnInit(): void {
    console.log("ngOnInit");

  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
  guardarSeccionInformacion(form:any){
    console.log("guardarSeccionInformacion");
  }
}
