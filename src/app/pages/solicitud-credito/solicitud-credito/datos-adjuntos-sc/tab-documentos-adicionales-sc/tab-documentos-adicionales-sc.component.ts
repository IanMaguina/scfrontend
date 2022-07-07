import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SolicitudAdjuntoService } from '@services/solicitud-adjunto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Adjunto } from 'src/app/models/adjunto.interface';

@Component({
  selector: 'app-tab-documentos-adicionales-sc',
  templateUrl: './tab-documentos-adicionales-sc.component.html',
  styleUrls: ['./tab-documentos-adicionales-sc.component.scss']
})
export class TabDocumentosAdicionalesScComponent implements OnInit {

  public formDocumentAdditional!: FormGroup;
  private file_store: FileList;
  private file_list: Array<string> = [];
  private idRequest: number = 0;
  @Input() id_solicitud_editar: number;
  displayedColumns:string[]=[
    'informacion_adicional',
    'adjunto',
  ];
  listadoDocumentosAdicionales:Adjunto[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private readonly solicitudAdjuntoService: SolicitudAdjuntoService) { }

  ngOnInit(): void {
    this.createForm();
    this.getIdRequest();
    this.listarAdjuntos();
  }

  public onInputFileChange(fileList: FileList): void {
    this.file_store = fileList;

    if (fileList.length) {
      const { name } = fileList[0];
      this.formDocumentAdditional.controls['file'].patchValue(`${name}`);
      return;
    }

    this.formDocumentAdditional.controls['file'].patchValue("");

  }

  public onSaveForm(): void {

    const formData = new FormData();
    const { description } = this.formDocumentAdditional.value;
    this.file_list = [];

    formData.append("tabla", 'tsolicitud');
    formData.append("activo", `${true}`);
    formData.append("id_tipo_adjunto", `${2}`);
    formData.append("id_tabla", `${this.idRequest}`);
    formData.append("informacion_adicional", description);

    for (let i = 0; i < this.file_store.length; i++) {
      formData.append("file", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    this.solicitudAdjuntoService.onAddAttached(formData).subscribe(data => {
      if(data.header.exito){
        this.enviarMensajeSnack(`Se guardo el archivo: ${data.payload.informacion_adicional} `);
        this.listarAdjuntos();
      }
   
    });

  }

  private createForm() {
    this.formDocumentAdditional = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private getIdRequest() {
    this.activatedRoute.params.pipe(
      tap(({ id }) => (this.idRequest = id)))
      .subscribe();
  }

  listarAdjuntos(){
    if(this.id_solicitud_editar){
      this.solicitudAdjuntoService.listarAdjuntosAdicionales(this.id_solicitud_editar).then(data =>{
        console.log("adjuntos: "+JSON.stringify(data));
        if(data.header.exito){
          this.listadoDocumentosAdicionales = data.payload;
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



}
