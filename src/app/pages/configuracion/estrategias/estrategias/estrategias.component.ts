import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CrearEstrategiaSociedadComponent } from '../crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { EditarEstrategiaSociedadComponent } from '../editar-estrategia-sociedad/editar-estrategia-sociedad.component';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styles: [
  ]
})
export class EstrategiasComponent implements OnInit {
  listadoEstrategiaRolUsuario: RolUsuario[] = [];
  estrategiaRolUsuario: RolUsuario = {};
  displayedColumns: string[] = ['rol','sociedad', 'grupo_cliente', 'usuario', 'usuario_revisor', 'activo'];
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
    })
  }

  openAgregarEstrategiaRolUsuario() {
    this.openDialog(CrearEstrategiaSociedadComponent,'Se registró la estrategia');
  }

  openEditarEstrategiaRolUsuario(element:RolUsuario) {
   console.log("a editar: "+JSON.stringify(element));
    this.openDialog(EditarEstrategiaSociedadComponent,'Se modificó la estrategia',{ estrategiaRolUsuario: element } );
  }
    

  async toggleEstrategiaRolUsuario(element:any) {
    console.log("toggleEstrategiaEstadoPorSociedad: "+JSON.stringify(element));
    let mensaje: string;

    if (element.activo) {
      mensaje = "¿Desea habilitar la estrategia?";
    } else {
      mensaje = "¿Desea deshabilitar la estrategia?";
    }
    element.mensaje = mensaje;

    const dialogRef2 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: element,
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let rolUsuario: RolUsuario = element;
        this.rolUsuarioService.editarEstrategiaRolUsuario(rolUsuario).then( (data) =>{
          if(data.header.exito){
            this.enviarMensajeSnack('Se modificó la actividad de la estrategia');
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
    this._snack.open(mensaje, 'cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  openDialog(componente: any, msg: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      width:'300px',
      data: data?data:'',      
      panelClass: 'custom_Estrategias'
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
 

}
