import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CrearSuplenciaComponent } from '../crear-suplencia/crear-suplencia.component';
import { EditarSuplenciaComponent } from '../editar-suplencia/editar-suplencia.component';

@Component({
  selector: 'app-suplencia',
  templateUrl: './suplencia.component.html',
  styles: [
  ]
})
export class SuplenciaComponent implements OnInit {
  listadoSuplencias:any[]=[
    {id:1, usuario:{ id:1, nombre: 'josé Arantegui' }, usuario_suplente:{ id:3, nombre: 'Nino Bravo' }, fecha_inicio:'10/10/2022', fecha_fin:'12/10/2022' , activo:true},
    {id:2, usuario:{ id:10, nombre: 'Alexandre Romañon' }, usuario_suplente:{ id:2, nombre: 'Maria Ramirez' }, fecha_inicio:'1/4/2022', fecha_fin:'17/4/2022', activo:true },
  ];
  displayedColumns: string[] = ['usuario', 'usuario_suplente', 'fecha_inicio', 'fecha_fin', 'activo'];
  
  
  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarSuplencias();
  }


  async listarSuplencias() {
    console.log("listarSuplencias");
  }
  openAgregarSuplencia(): void {
    let dialogRef = this.matDialog.open(CrearSuplenciaComponent, {
      disableClose: true,
      width:'400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarSuplencias();
      console.log("return function process");
    });


  }

  async toggleSuplenciaEstado(element: any) {
    console.log("objeto a inactivar" + JSON.stringify(element));
    let mensaje:string;
    if(element.activo){
      mensaje = "¿Desea habilitar la suplencia?";
    }else{
      mensaje = "¿Desea deshabilitar la suplencia?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"400px",
      data:element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        console.log("ACTUALIZAR EL ACTIVO");
       
      }
      this.listarSuplencias();
    });

  }

  async openEditarSuplencia(form: any) {
    console.log("al editar usuario: " + JSON.stringify(form));
    let dialogRef = this.matDialog.open(EditarSuplenciaComponent, {
      disableClose: true,
      data: form
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("ACTUALIZÓ");

      this.listarSuplencias();
    });

  }



}
