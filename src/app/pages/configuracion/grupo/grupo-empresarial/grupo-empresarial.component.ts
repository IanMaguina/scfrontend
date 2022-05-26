import { GrupoEmpresarialService } from '../../../../services/grupo-empresarial.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarIntegrantesGrupoComponent } from '../asignar-integrantes-grupo/asignar-integrantes-grupo.component';
import { CrearGrupoEmpresarialComponent } from '../crear-grupo-empresarial/crear-grupo-empresarial.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ClienteAgrupacion } from 'src/app/models/cliente-agrupacion.interface';
import { AgrupacionClienteSolicitud } from 'src/app/models/agrupacion-cliente-solicitud.interface';

@Component({
  selector: 'app-grupo-empresarial',
  templateUrl: './grupo-empresarial.component.html',
  styles: [
  ]
})
export class GrupoEmpresarialComponent implements OnInit {
  listadoGrupos:AgrupacionClienteSolicitud[] = [];
    
  displayedColumns: string[] = ['nombre', 'pendiente','usuario_creacion', 'estado', 'id'];
  
  constructor(
    private matDialog: MatDialog,
    private grupoEmpresarialService:GrupoEmpresarialService
    ) { }

  ngOnInit(): void {
    console.log("ngInit");
    this.listarGruposEmpresariales();
  }

  async listarGruposEmpresariales() {
    await this.grupoEmpresarialService.listarGruposEmpresariales().then(data => {
      console.log(JSON.stringify(data.payload));
      this.listadoGrupos = data.payload;
    })
  }

  openAgregarGrupo(){
    const dialogRef = this.matDialog.open(CrearGrupoEmpresarialComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
        this.listarGruposEmpresariales();
    });

  }
  openAsignarIntegrantesGrupo(id:any){
    const dialogRef2 = this.matDialog.open(AsignarIntegrantesGrupoComponent, {
      disableClose: true,
      width: '80%',
      data:id
    });

    dialogRef2.afterClosed().subscribe(() => {
      this.listarGruposEmpresariales();
    });
  }
  toggleGrupoActivo(element:any){
    let mensaje:string;
    
    if(element.activo){
      mensaje = "¿Desea habilitar el Grupo Empresarial?";
    }else{
      mensaje = "¿Desea deshabilitar el Grupo Empresarial?";
    }
    element.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"400px",
      data:element
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        let clienteAgrupacion:ClienteAgrupacion=element;
        this.grupoEmpresarialService.actualizarGrupoEmpresarial(clienteAgrupacion);
        this.listarGruposEmpresariales();
        
      }
    });
  }
  editarGrupo(element:any){
    console.log("editarGrupo: "+ JSON.stringify(element));
  }
}