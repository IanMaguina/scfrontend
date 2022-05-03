import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudEmpresaRelacionada } from 'src/app/models/solicitud-empresa_relacionada.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-empresas-relacionadas-sc',
  templateUrl: './empresas-relacionadas-sc.component.html',
  styles: [
  ]
})
export class EmpresasRelacionadasScComponent implements OnInit {
  @Input() id_solicitud: number;
  formulary: FormGroup;
  displayedColumns:string[]= [
    'id',
    'razon_social',
    'numero_documento'
  ]
  listadoEmpresaRelacionadas:any[]=[
    {
      id: 1,
      numero_documento: '65432189745',
      razon_social: 'Cliente 1',
    },
  ];

  formErrors = {
    'numero_documento': '',
    'razon_social': '',
   
  }
  validationMessages = {
    'numero_documento': {
      'required': 'el ruc es requerido.'
    },
    'razon_social': {
      'required': 'el razon_social es requerido.'
    },
   
    
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _formValidatorService:FormValidatorService,
    private solicitudService:SolicitudService
  ) { 
    this.formulary = this._formBuilder.group({
      numero_documento: ['', Validators.required],
      razon_social: ['', Validators.required],
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this._formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit empresas relacionadas-->"+this.id_solicitud);
    this.listar();
  }
  
  listar(){
    this.solicitudService.listarSolicitudEmpresaRelacionada(this.id_solicitud).then(data=>{
      this.listadoEmpresaRelacionadas=data.payload;
    })
  }

  async agregar(form:any){
    console.log("agregarReferencia"+JSON.stringify(form));
    let solicitud:SolicitudEmpresaRelacionada = await this.mapeoData(form)
    this.solicitudService.crearSolicitudEmpresaRelacionada(solicitud).then(data=>{
      this.listar();
      this.limpiarCampos();

    })

  }

  async mapeoData(form: any) {
    let solicitud: SolicitudEmpresaRelacionada = {
      "id_solicitud": this.id_solicitud,
      "id_documento_identidad": 1,
      "numero_documento": form.numero_documento,
      "razon_social": form.razon_social
    }
    return solicitud;
  }

  eliminar(id:number){
    console.log("eliminarReferencia"+id);
    this.solicitudService.eliminarSolicitudEmpresaRelacionada(id).then(data=>{
      this.listar();
    })

  }

  limpiarCampos(){
    this.formulary.get("numero_documento").setValue("");
    this.formulary.get("razon_social").setValue("");
  }

}
