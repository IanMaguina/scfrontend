import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario.interface';
import { UsuarioService } from '../../../../services/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: []
})
export class ListarUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'perfil', 'correo', 'id'];
  listadoUsuarios: Usuario[] = [];


  constructor(
    private matDialog: MatDialog,
    private usuarioService: UsuarioService,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }


  async listarUsuarios() {
    this.usuarioService.listarUsuarios().then(data => {
      this.listadoUsuarios = data.payload;
      console.log("usuarios listados: " + JSON.stringify(data.payload));

    })
  }
  openAgregarUsuario(): void {
    this.openDialog(CrearUsuarioComponent, 'se registró el usuario');
  }

  async toggleUsuarioEstado(element: Usuario) {
    console.log("objeto a inactivar" + JSON.stringify(element.id));

    this.usuarioService.activarUsuario(element).then(data => {
      console.log("cuando actualiza esto pasa: " + JSON.stringify(data));
    });
  }

  async openEditarUsuario(form: any) {
    this.openDialog(EditarUsuarioComponent, 'se actualizó el usuario', form);
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
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack(msg);
        this.listarUsuarios();
      }
    });
  }



}
