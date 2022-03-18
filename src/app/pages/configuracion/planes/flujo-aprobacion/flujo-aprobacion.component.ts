import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarAprobadoresComponent } from '../asignar-aprobadores/asignar-aprobadores.component';

@Component({
  selector: 'app-flujo-aprobacion',
  templateUrl: './flujo-aprobacion.component.html',
  styles: [
  ]
})
export class FlujoAprobacionComponent implements OnInit {
  listadoAprobacionxDV:any[]=[
    {id:1, documentovalorado:'Cheque', aprobadores:'Rafa, Felipe, Rian'},
    {id:2, documentovalorado:'Carta Fianza', aprobadores:'Rafa, Felipe, Rian'},
    {id:3, documentovalorado:'Letra', aprobadores:'Rafa, Felipe, Rian'},
    {id:4, documentovalorado:'pagaré', aprobadores:'Rafa, Felipe, Rian'},
  ];
  displayedColumns:string[]= ['documentovalorado','aprobadores'];


  constructor( 
    private matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }


  editarAprobadores(element:any){
    let item = {
      plan:1, 
      documento:element.id
    }
    const dialogRef2 = this.matDialog.open(AsignarAprobadoresComponent, {
      disableClose: true,
      width: '60%',
      data:item,
    });

    dialogRef2.afterClosed().subscribe(result => {
      /* listar documentos - aprobadores actualizados */
      console.log("return function process");
    });
  }

}
