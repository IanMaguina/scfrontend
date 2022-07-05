import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.interface';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from '../../../../services/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: []
})
export class ListarUsuarioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'perfil', 'correo', 'id'];
  listadoUsuarios: Usuario[] = [];

  dataSource = new MatTableDataSource();


  constructor(
    private matDialog: MatDialog,
    private usuarioService: UsuarioService,
    private _snack: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }
  
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async listarUsuarios() {
    this.usuarioService.listarUsuariosTodos().then(data => {
      this.listadoUsuarios = data.payload;
      this.dataSource.data = this.listadoUsuarios;

      console.log("usuarios listados: " + JSON.stringify(data.payload));

    })
  }
  openAgregarUsuario(): void {
    this.openDialog(CrearUsuarioComponent, 'Se registró el usuario');
  }

  async toggleUsuarioEstado(element: any) {
    let mensaje: string;

    if (element.activo) {
      mensaje = "¿Desea habilitar el usuario?";
    } else {
      mensaje = "¿Desea deshabilitar el usuario?";
    }
    element.mensaje = mensaje;

    const dialogRef2 = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,

      data: element,

    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        let usuario: Usuario = element;
        this.usuarioService.activarUsuario(usuario).then(data => {
          if (data.header.exito) {
            this.enviarMensajeSnack('Se modificó la actividad del usuario');
            this.listarUsuarios();
          } else {
            this.listarUsuarios();
          }
        });
      } else {
        this.listarUsuarios();
      }
    })
  }

  async openEditarUsuario(form: any) {
    this.openDialog(EditarUsuarioComponent, 'Se actualizó el usuario', form);
  }

  enviarMensajeSnack(mensaje: string) {
    this._snack.open(mensaje, 'Cerrar', {
      duration: 1800,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }

  openDialog(componente: any, msg: string, data?: any) {
    let dialogRef = this.matDialog.open(componente, {
      disableClose: true,
      data: data ? data : '',
      panelClass: 'custom_EditarUsuario',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CONFIRM_DLG_YES') {
        this.enviarMensajeSnack(msg);
        this.listarUsuarios();
      } else {
        this.listarUsuarios();

      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
