import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'sociedad', 'perfil', 'correo', 'id'];
  listadoUsuarios: Usuario[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  openAgregarUsuario(){

  }
  toggleUsuarioEstado(element:any){

  }



}
