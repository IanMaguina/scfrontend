import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.interface';
import { UsuarioService } from '../../../../services/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'sociedad', 'perfil', 'correo', 'id'];
  listadoUsuarios: Usuario[] = [];


  constructor(
    private matDialog: MatDialog,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }


  async listarUsuarios() {
    this.usuarioService.listarUsuarios().then(data => {
      this.listadoUsuarios = data;
      console.log(JSON.stringify(this.listadoUsuarios));

    })
  }
  openAgregarUsuario(): void {
    let dialogRef = this.matDialog.open(CrearUsuarioComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarUsuarios();
      console.log("return function process");
    });


  }

  async toggleUsuarioEstado(element: Usuario) {
    console.log("objeto a inactivar" + JSON.stringify(element));

    this.usuarioService.activarUsuario(element).then(data => {
      console.log("cuando actualiza esto pasa: " + JSON.stringify(data));
    });

  }

  async openEditarUsuario(form: any) {
    console.log("al editar usuario: " + JSON.stringify(form));
    let dialogRef = this.matDialog.open(EditarUsuarioComponent, {
      disableClose: true,
      data: form
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("ACTUALIZOOOOOO");
      this.listarUsuarios();
    });

  }



}
