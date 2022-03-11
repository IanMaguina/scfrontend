import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.interface';
import { UsuarioService } from '../../../../services/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
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

  listarUsuarios(){
    this.usuarioService.listarUsuarios().then(list=>{
      this.listadoUsuarios=list.payload;
      console.log(JSON.stringify(this.listadoUsuarios));
    })
  }
  openAgregarUsuario(): void {
    //console.log("usuario enviado a editar =" + JSON.stringify(usuario));
    const dialogRef = this.matDialog.open(CrearUsuarioComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("return function process");
    });


  }

  toggleUsuarioEstado(element: any) {
    console.log("action");
  }



}
