import { SolicitudAdjuntoService } from './../../../../../services/solicitud-adjunto.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab-estados-financieros-sc',
  templateUrl: './tab-estados-financieros-sc.component.html',
  styleUrls: ['./tab-estados-financieros-sc.component.scss']
})
export class TabEstadosFinancierosScComponent implements OnInit {

  public formFinancialState!: FormGroup;
  private file_store: FileList;
  private file_list: Array<string> = [];
  private idRequest: number = 0;

  @Input() id_solicitud: string;

  adjuntarfinancieros: number = 1;
  motivofinancieros: number = 2;
  estadosfinancieros = new FormControl('auto');

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly solicitudAdjuntoService: SolicitudAdjuntoService) { }

  ngOnInit(): void {
    this.createForm();
    this.getIdRequest();
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

    this.solicitudAdjuntoService.onAddAttached(formData).subscribe();

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
      .subscribe();
  }

  /*async grabarAnexo(archivo: File, filename: string) {
   this.solicitudAdjuntoService.crear(archivo, this.id_solicitud, filename)
     .then(result => {
       if (result.resultado == 1) {
         this._snack.open(this.MENSAJE_CARGAR_ANEXO_SOLICITUD, 'cerrar', {
           duration: 1800,
           horizontalPosition: "end",
           verticalPosition: "top"
         });

         this.getListaAnexos(this.id_solicitud);
         this.dialogForm.get('fileAnexoSolicitud').reset(); 
       }
     }).catch(error => {
       console.debug("errors when trying to add Document....");
     })
 }*/

}
