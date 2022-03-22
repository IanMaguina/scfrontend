import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsistenteFacturacion } from 'src/app/models/asistente-facturacion.interface';
import { AsistenteFacturacionService } from 'src/app/services/asistente-facturacion.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CrearAsistenteFacturacionComponent } from '../crear-asistente-facturacion/crear-asistente-facturacion.component';

@Component({
  selector: 'app-asistente-facturacion',
  templateUrl: './asistente-facturacion.component.html',
  styles: [
  ]
})
export class AsistenteFacturacionComponent implements OnInit {
  listadoAsistentesFacturacion: AsistenteFacturacion[] = [
    {id:1, usuario:{
      id:1,
      nombre: "Asistente 1",
      correo: "asist@gmail.com",
      id_perfil: 1,
      sociedad_codigo_sap: "xxxx",
      },zonal:{id:1, nombre: "zonal 1"}, activo:true},
    {id:2, usuario:{
      id:2,
      nombre: "Asistente 2",
      correo: "asist2@gmail.com",
      id_perfil: 12,
      sociedad_codigo_sap: "yyyy",
      },zonal:{id:1, nombre: "zonal 2"}, activo:true},
    {id:3, usuario:{
      id:3,
      nombre: "Asistente 3",
      correo: "asist3@gmail.com",
      id_perfil: 1,
      sociedad_codigo_sap: "zzzz",
      },zonal:{id:3, nombre: "zonal 3"}, activo:true},
  ];


  displayedColumnsSociedad: string[] = ['usuario', 'zonal', 'activo'];
  constructor(
    private matDialog: MatDialog,
    private asistenteFacturacionService: AsistenteFacturacionService,

  ) { }

  ngOnInit(): void {
    console.log("ngInit");
  }
  async listarAsistentesFacturacion(){
    await this.asistenteFacturacionService.listarAsistentesFacturacion().then( (data) => {
      this.listadoAsistentesFacturacion = data.payload;
    });
  }
  openAgregarAsistenteFacturacion(){
    const dialogRef = this.matDialog.open(CrearAsistenteFacturacionComponent, {
      disableClose: true,
      width:"300px",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarAsistentesFacturacion();
      console.log("se agregó el asistenteFacturacion correctamente");
    });
  }
  

  onchangeEstado(form:any){
    let mensaje:string;
    
    if(form.activo){
      mensaje = "¿Desea habilitar el asistente de facturacion?";
    }else{
      mensaje = "¿Desea deshabilitar el asistente de facturacion?";
    }
    form.mensaje = mensaje;

    const dialogRef3 = this.matDialog.open( ConfirmDialogComponent, {
      disableClose: true,
      width:"250px",
      data:form
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result==='CONFIRM_DLG_YES'){
        this.asistenteFacturacionService.activarDesactivarAsistenteFacturacion(form).then((data)=>{
          if(data.header.exito){
            console.log("Se actualizó la actividad del asistente de facturacion");
            this.listarAsistentesFacturacion();
          }
        });
      }
    });
  }



}
