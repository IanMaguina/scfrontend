import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarIntegrantesGrupoComponent } from '../asignar-integrantes-grupo/asignar-integrantes-grupo.component';
import { CrearGrupoEmpresarialComponent } from '../crear-grupo-empresarial/crear-grupo-empresarial.component';

@Component({
  selector: 'app-grupo-empresarial',
  templateUrl: './grupo-empresarial.component.html',
  styles: [
  ]
})
export class GrupoEmpresarialComponent implements OnInit {
  listadoGrupos:any[] = [
    {
      'grupo':'Grupo fake 1',
      'id':1, 
      'estado':'habilitado'
    }
  ];
  displayedColumns: string[] = ['grupo', 'estado', 'id'];
  
  constructor(
    private matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
    console.log("ngInit");
  }
  openAgregarGrupo(){
    const dialogRef = this.matDialog.open(CrearGrupoEmpresarialComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
    });

  }
  openAsignarIntegrantesGrupo(id:any){
    const dialogRef = this.matDialog.open(AsignarIntegrantesGrupoComponent, {
      disableClose: true,
      width: '60%',
      data:id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
    });

  }
}