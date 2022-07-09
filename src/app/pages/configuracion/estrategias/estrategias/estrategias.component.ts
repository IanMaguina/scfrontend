import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CrearEstrategiaSociedadComponent } from '../crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { EditarEstrategiaSociedadComponent } from '../editar-estrategia-sociedad/editar-estrategia-sociedad.component';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styles: [
  ]
})
export class EstrategiasComponent implements OnInit {
  listadoEstrategiaRolUsuario: RolUsuario[] = [];
  estrategiaRolUsuario: RolUsuario = {};
  displayedColumns: string[] = ['rol','Sociedad', 'grupo_cliente', 'usuario', 'usuario_revisor', 'activo'];
  dataSource = new MatTableDataSource<RolUsuario>();

  constructor(
    private matDialog: MatDialog, 
    private rolUsuarioService:RolUsuarioService,
    private _snack:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarEstrategiaRolUsuario();
  }

  async listarEstrategiaRolUsuario() { 
    this.rolUsuarioService.listarEstrategiaRolUsuario().then(data => {
      this.listadoEstrategiaRolUsuario = data.payload;
      this.dataSource.data = this.listadoEstrategiaRolUsuario;
    })
  }

  openAgregarEstrategiaRolUsuario() {
    this.openDialog(CrearEstrategiaSociedadComponent,'Se registró el Rol del Usuario');
  }

  openEditarEstrategiaRolUsuario(element:RolUsuario) {
   console.log("a editar: "+JSON.stringify(element));
    this.openDialog(EditarEstrategiaSociedadComponent,'Se modificó el Rol del Usuario',{ estrategiaRolUsuario: element } );
  }
    

  async toggleEstrategiaRolUsuario(element:any) {
    console.log("toggleEstrategiaEstadoPorSociedad: "+JSON.stringify(element));
    let mensaje: string;

    if (element.activo) {
      mensaje = "¿Desea habilitar el Rol del Usuario?";
    } else {
      mensaje = "¿Desea deshabilitar el Rol del Usuario?";
    }
    element.mensaje = mensaje;

    const dialogRef2 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,

      data: element,
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let rolUsuario: RolUsuario = element;
        this.rolUsuarioService.editarEstrategiaRolUsuario(rolUsuario).then( (data) =>{
          if(data.header.exito){
            this.enviarMensajeSnack('Se modificó la actividad del rol del Usuario');
            this.listarEstrategiaRolUsuario();
          }else{
            this.listarEstrategiaRolUsuario();
          }
        });
      }else{
        this.listarEstrategiaRolUsuario();
      }
  });
}

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'Cerrar', {
      duration: 3600,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  openDialog(componente: any, msg: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width:'300px',
      data: data?data:'',      
      panelClass: 'custom_Estrategias',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack(msg);
        this.listarEstrategiaRolUsuario();
      }else{
        this.listarEstrategiaRolUsuario();

      }
    });
  }

  applyFilter(event: Event) {
   // console.log("filtrar: "+JSON.stringify((event.target as HTMLInputElement).value));
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   // console.log("filtrado: "+this.dataSource);
  }
 

}
