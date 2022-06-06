import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CrearEstrategiaSociedadComponent } from '../crear-estrategia-sociedad/crear-estrategia-sociedad.component';
import { EditarEstrategiaSociedadComponent } from '../editar-estrategia-sociedad/editar-estrategia-sociedad.component';
import { RolUsuario } from 'src/app/models/rol-usuario.interface';
import { RolUsuarioService } from '@services/rol-usuario.service';
@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styles: [
  ]
})
export class EstrategiasComponent implements OnInit {
  listadoEstrategiaRolUsuario: RolUsuario[] = [];
  estrategiaRolUsuario: RolUsuario = {};
  displayedColumns: string[] = ['sociedad', 'grupo_cliente','rol', 'usuario', 'usuario_revisor', 'activo'];
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
    this.openDialog(CrearEstrategiaSociedadComponent,'Se registró la estrategia' );
  }

  openEditarEstrategiaRolUsuario(element:RolUsuario) {
   console.log("a editar: "+JSON.stringify(element));
    this.openDialog(EditarEstrategiaSociedadComponent,'Se modificó la estrategia',{ estrategiaRolUsuario: element } );
  }
    

  async toggleEstrategiaRolUsuario(element:any) {
    console.log("toggleEstrategiaEstadoPorSociedad: "+JSON.stringify(element));
    await this.rolUsuarioService.editarEstrategiaRolUsuario(element).then( (data) =>{
      if(data.header.exito){
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
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack(msg);
        this.listarEstrategiaRolUsuario();
      }
    });
  }
 

}
