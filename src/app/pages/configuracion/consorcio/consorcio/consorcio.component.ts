import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { ConsorcioService } from 'src/app/services/consorcio.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
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
    private consorcioService:ConsorcioService
    ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarConsorcios();
  }
  async listarConsorcios() {
    this.consorcioService.listarConsorcios().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoConsorcios = data.payload;
    })
  }

  openAgregarConsorcio(){
    const dialogRef = this.matDialog.open(CrearConsorcioComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
      this.listarConsorcios();
    });

  }
  openAsignarIntegrantes(id:any){
    const dialogRef2 = this.matDialog.open(AsignarIntegrantesComponent, {
      disableClose: true,
      width: '80%',
      data:id
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log("return function process");
      this.listarConsorcios();
    });

  }

  toggleConsorcioActivo(element:any){
    let mensaje:string;
    
    if(element.activo){
      mensaje = "¿Desea habilitar el plan?";
    }else{
      mensaje = "¿Desea deshabilitar el plan?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"400px",
      data:element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        console.log("return function process");
        let clienteAgrupacion:ClienteAgrupacion=element;
        console.log("return function process-->"+JSON.stringify(clienteAgrupacion));
        this.consorcioService.eliminarConsorcio(clienteAgrupacion);

      }
      this.listarConsorcios();
    });
  }

  editarConsorcio(element:any){
    console.log("editarConsorcio");
  }

  
}
