import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-consorcios-coincidentes-dialog',
  templateUrl: './consorcios-coincidentes-dialog.component.html',
  styles: [
  ]
})
export class ConsorciosCoincidentesDialogComponent implements OnInit {
  listaConsorcios:any[] = [
    {
      id:1,
      razon_social:'consorcio 1 SAC',
      empresas: [
        {
          id:1,
          razon_social:'Empresa 1 SAC'
        },
        {
          id:2,
          razon_social:'Empresa 2 SAC'
        },
        {
          id:3,
          razon_social:'Empresa 3 SAC'
        },
      ]
    },
    {
      id:1,
      razon_social:'consorcio 2 SAC',
      empresas: [
        {
          id:4,
          razon_social:'Empresa 4 SAC'
        },
        {
          id:5,
          razon_social:'Empresa 5 SAC'
        },
        {
          id:6,
          razon_social:'Empresa 6 SAC'
        },
      ]
    },
  ];
  nodata:boolean= false;
  constructor(
    public dialogRef: MatDialogRef<ConsorciosCoincidentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //this.listaConsorcios = data.payload;

  }

  ngOnInit(): void {
  }
  verConsorcio(consorcio:number){
    this.cerrarDialog(consorcio);
  }

  cerrarDialog(consorcio:number){
    this.dialogRef.close(consorcio);
  }

}
