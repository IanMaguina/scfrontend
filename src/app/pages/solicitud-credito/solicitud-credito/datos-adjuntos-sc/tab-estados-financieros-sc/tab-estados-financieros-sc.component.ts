import { SolicitudAdjuntoService } from './../../../../../services/solicitud-adjunto.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Adjunto } from 'src/app/models/adjunto.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TipoMotivoFinancieroService } from '@services/tipo-motivo-financiero.service';
import { SolicitudService } from '@services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud.interface';
import { AutenticacionService } from '@services/autenticacion.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { GlobalSettings } from 'src/app/shared/settings';

@Component({
  selector: 'app-tab-estados-financieros-sc',
  templateUrl: './tab-estados-financieros-sc.component.html',
  styleUrls: ['./tab-estados-financieros-sc.component.scss']
})
export class TabEstadosFinancierosScComponent implements OnInit {

  public formFinancialState!: FormGroup;
  private file_store: FileList;
  listadoEstadosFinancieros: Adjunto[];
  displayedColumns:string[]=[
    'informacion_adicional',
    'adjunto',
    'id',
  ];
  private file_list: Array<string> = [];
  private idRequest: number = 0;

  @Input() id_solicitud_editar: number;

  adjuntarfinancieros: number = 1;
  motivofinancieros: number = 2;
  estadosfinancieros = new FormControl('auto');

  motivo_financiero: any;
  motivo_descripcion:string;
  motivos:any;

  userInfo:any;

  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;

  editable:boolean=false;

  id_motivo_otros = 4;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private _snack: MatSnackBar,
    private tipoMotivoFinancieroService :TipoMotivoFinancieroService,
    private solicitudService: SolicitudService,
    private autenticacionService:AutenticacionService,
    private readonly solicitudAdjuntoService: SolicitudAdjuntoService) { }

  async ngOnInit() {
    console.log("id editar adjuntos: "+this.id_solicitud_editar);   

    this.createForm();
    this.getIdRequest();
    this.listarAdjuntos();
    await this.listaMotivos();

    this.solicitudService.obtenerSolicitud(this.id_solicitud_editar).then(s=>{

      //console.log("ssssssssss ="+ JSON.stringify(s));

      this.editable = s.payload && s.payload.id_estado===this.ESTADO_SOLICITUD_EN_SOLICITANTE?true:false;

      if (s.payload && s.payload.id_tipo_motivo_financiero){
        this.estadosfinancieros.setValue(this.motivofinancieros);

        console.log("s.payload.id_tipo_motivo_financiero="+s.payload.id_tipo_motivo_financiero);

        this.motivo_financiero = this.motivos.find(m=>m.id===s.payload.id_tipo_motivo_financiero);

        this.motivo_descripcion = s.payload.motivo_financiero;

      }

});

    this.userInfo = this.autenticacionService.getUserInfo();

    console.log("tipo=1111 "+ JSON.stringify(this.estadosfinancieros.value === this.motivofinancieros));
  }


  validaMotivo(event){
      console.log("motivo seleccionado = "+ JSON.stringify(event.value));
      if (event.value && event.value.id!=this.id_motivo_otros){
        this.motivo_descripcion = '';
      }
  }

  async listaMotivos(){
     const items = await this.tipoMotivoFinancieroService.listar();
     if (items){
        this.motivos = items.payload;
        console.log("motivos..."+JSON.stringify(this.motivos));
     }
  }

  public onInputFileChange(fileList: FileList): void {
    this.file_store = fileList;

    if (fileList.length) {
      const { name } = fileList[0];
      this.formFinancialState.controls['file'].patchValue(`${name}`);
      return;
    }

    this.formFinancialState.controls['file'].patchValue("");

  }

  guardarMotivo(){

      console.log("guardar motivo..."+ this.id_solicitud_editar +", "+ JSON.stringify(this.motivo_financiero));
      console.log("motivo descripcion="+this.motivo_descripcion);

      const motivo_desc = this.motivo_financiero.id==4?this.motivo_descripcion:'';

      const solicitud:Solicitud = {id_usuario: this.userInfo.id, id_tipo_motivo_financiero: this.motivo_financiero.id, motivo_financiero:motivo_desc}

      this.solicitudService.actualizarMotivoFinancieroSolicitud(this.id_solicitud_editar,solicitud).then(async data => {
        console.log("se actualizo la solicitud-->" + JSON.stringify(data));
        if (data.header.exito) {
          if (data.payload && data.payload.warning) {
            this.openAlerta(data.payload.warning.mensaje);              
          } else {
            this.enviarMensajeSnack("Se actualizo la solicitud.");
          }
        }
      });

  }


  openAlerta(mensaje: string) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: mensaje
    });

  }

  public onSaveForm(): void {

    const formData = new FormData();
    const { description } = this.formFinancialState.value;
    this.file_list = [];

    
    formData.append("tabla", 'tsolicitud');
    formData.append("activo", `${true}`);
    formData.append("id_tipo_adjunto", `${1}`);
    formData.append("id_tabla", `${this.idRequest}`);
    formData.append("informacion_adicional", description);

    for (let i = 0; i < this.file_store.length; i++) {
      formData.append("file", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    this.solicitudAdjuntoService.onAddAttached(formData)
    .subscribe(data => {
      if(data.header.exito){
        this.enviarMensajeSnack(`Se guardo el archivo: ${data.payload.informacion_adicional} `);
        
        this.listarAdjuntos();
      }
   
    });

  }

  private createForm() {
    this.formFinancialState = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private getIdRequest() {
    this.activatedRoute.params.pipe(
      tap(({ id }) => (this.idRequest = id)))
      .subscribe(_ =>{
        this.listarAdjuntos();
      });
  }

  listarAdjuntos(){
    if(this.id_solicitud_editar){
      this.solicitudAdjuntoService.listarEstadosFinancieros(this.id_solicitud_editar).then(data =>{
        console.log("adjuntos: "+JSON.stringify(data));
        if(data.header.exito){
          this.listadoEstadosFinancieros = data.payload;
        }
      })
    }
  }
  openURL(url:string){
    window.open(url);
  }

 enviarMensajeSnack(mensaje: string) {
  this._snack.open(mensaje, 'cerrar', {
    duration: 3600,
    horizontalPosition: "end",
    verticalPosition: "top"
  });
}

eliminar(element:any){
  let data= {
    mensaje: 'Está seguro de eliminar el estado financiero?'
  }
  let dialogRef1 = this.matDialog.open(ConfirmDialogComponent, {
    disableClose: true, 
    data: data
  });

  dialogRef1.afterClosed().subscribe(res => {
    if(res === 'CONFIRM_DLG_YES'){
      this.solicitudAdjuntoService.eliminarAdjunto(element.id).then(response =>{
        if(response.header.exito){
          this.enviarMensajeSnack('Se eliminó el adjunto');
          this.listarAdjuntos();
        }
      })
    }
    
  });
}

}
