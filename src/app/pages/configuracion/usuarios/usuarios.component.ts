import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.interface';
import { CrearUsuarioDialogComponent } from 'src/app/shared/crear-usuario-dialog/crear-usuario-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'sociedad', 'perfil', 'correo', 'id'];
  listadoUsuarios: Usuario[] = [];


  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openAgregarUsuario(): void {
    //console.log("usuario enviado a editar =" + JSON.stringify(usuario));
     const dialogRef = this.matDialog.open(CrearUsuarioDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });


  }

  toggleUsuarioEstado(element:any){

  }



}
