import { Component, Inject,OnInit } from '@angular/core';
import { FormControl ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-motivo-dialog',
  templateUrl: './motivo-dialog.component.html',
  styleUrls: ['./motivo-dialog.component.css']
})
export class MotivoDialogComponent implements OnInit {

  mensaje:string;

  motivoFormControl:FormControl;

  constructor(
    public dialogRef: MatDialogRef<MotivoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {     
     this.mensaje = data.mensaje;

     this.motivoFormControl = new FormControl('', [Validators.required]);

  }
  ngOnInit(): void {
  }

  onNoClick(res:string){

    var result = {};

    if (res == "CONFIRM_DLG_YES"){        
        console.log("motivo = "+this.motivoFormControl.value);

        result["motivo"]=this.motivoFormControl.value;

    }


    this.dialogRef.close(result);
  }
}
