import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DlgNuevoPlanScComponent } from './dlg-nuevo-plan-sc/dlg-nuevo-plan-sc.component';

@Component({
  selector: 'app-datos-planes-sc',
  templateUrl: './datos-planes-sc.component.html',
  styles: [
  ]
})
export class DatosPlanesScComponent implements OnInit {
  /* @Output() onSecondFormGroup: EventEmitter<any> = new EventEmitter();
  secondFormGroup:FormGroup; */
  
  constructor( 
    private matDialog: MatDialog,
  ){
   /* this.secondFormGroup = this._formBuilder.group({
     secondCtrl: ['', Validators.required],
   }); */
  }
  ngOnInit(): void {
  }

  openNuevoCredito(){
    const dialogRef = this.matDialog.open(DlgNuevoPlanScComponent, {
      disableClose: true,
      width:"750px",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarRiesgos();
      if(result === 'CONFIRM_DLG_YES'){
        
        console.log("se agregó el plan correctamente");
      }
    });
  }
  listarRiesgos(){
    console.log("actualizar  componente de lista de riesgos");
  }

}
