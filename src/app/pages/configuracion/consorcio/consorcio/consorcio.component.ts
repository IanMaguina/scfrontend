import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarIntegrantesComponent } from '../asignar-integrantes/asignar-integrantes.component';
import { CrearConsorcioComponent } from '../crear-consorcio/crear-consorcio.component';

@Component({
  selector: 'app-consorcio',
  templateUrl: './consorcio.component.html',
  styles: [
  ]
})
export class ConsorcioComponent implements OnInit {
  listadoConsorcios:any[] = [
    {
      'razonsocial':'010101',
      
      'ruc':'654321987564',
      'id':1, 
      'estado':'activo'
    }
  ];
  displayedColumns: string[] = ['razonsocial', 'ruc', 'estado', 'id'];
  
  constructor(
    private matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
    console.log("ngInit");
  }
  openAgregarConsorcio(){
    const dialogRef = this.matDialog.open(CrearConsorcioComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
    });

  }
  openAsignarIntegrantes(id:any){
    const dialogRef = this.matDialog.open(AsignarIntegrantesComponent, {
      disableClose: true,
      width: '60%',
      data:id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
    });

  }
}
