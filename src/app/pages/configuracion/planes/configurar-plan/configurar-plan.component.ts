import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-configurar-plan',
  templateUrl: './configurar-plan.component.html',
  styles: [
  ]
})
export class ConfigurarPlanComponent implements OnInit {
  nombreplan:string ='';
  informacionForm: any;
  

  constructor(
    public dialogRef: MatDialogRef<ConfigurarPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { 
    console.log("configuracion data plan-->"+JSON.stringify(data));
    this.nombreplan=data.tipo_plan_credito.id+"-" +data.tipo_plan_credito.nombre;

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
