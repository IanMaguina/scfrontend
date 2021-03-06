import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudReferenciaComercial } from 'src/app/models/solicitud-referencia_comercial.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SolicitudService } from 'src/app/services/solicitud.service';


@Component({
  selector: 'app-referencias-comerciales-sc',
  templateUrl: './referencias-comerciales-sc.component.html',
  styles: [
  ]
})
export class ReferenciasComercialesScComponent implements OnInit {
  @Input() id_solicitud: number;
  formulary: FormGroup;
  displayedColumns:string[]= [
    'razon_social',
    'numero_documento',
    'contacto',
    'cargo',
    'telefono',
    'id'
  ]
  listadoReferenciasComerciales:any[]=[
    {
      id: 1,
      razon_social: 'Empresa 1',
      numero_documento: '65432189745',
      contacto: 'Proveedor 1',
      cargo: 'Gerente',
      telefono: '985432156'
    },
  ];
  formErrors = {
    'razon_social': '',
    'numero_documento': '',
    'contacto': '',
    'cargo': '',
    'telefono': '',
   
  }
  validationMessages = {
    'razon_social': {
      'required': 'el razon_social es requerido.'
    },
    'numero_documento': {
      'required': 'el numero_documento es requerido.'
    },
    'contacto': {
      'required': 'el contacto es requerido.'
    },
    'cargo': {
      'required': 'el cargo es requerido.'
    },
    'telefono': {
      'required': 'el telefono es requerido.'
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
      razon_social: ['', Validators.required],
      numero_documento: ['', Validators.required],
      contacto: ['', Validators.required],
      cargo: ['', Validators.required],
      telefono: ['', Validators.required]
    })
    this.formulary.valueChanges.subscribe(() => {
      this.formErrors = this._formValidatorService.handleFormChanges(this.formulary, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit referencia comercial");
    if (this.id_solicitud!==null){
      this.listar();
    }
    
  }
  
  listar(){
    this.solicitudService.listarSolicitudReferenciaComercial(this.id_solicitud).then(data=>{
      this.listadoReferenciasComerciales=data.payload;
    })

  }

  async agregar(form:any){
    console.log("agregarReferencia"+JSON.stringify(form));
    let solicitud:SolicitudReferenciaComercial = await this.mapeoData(form)
    this.solicitudService.crearSolicitudReferenciaComercial(solicitud).then(data=>{
      this.listar();
      this.limpiarCampos();

    })

  }

  async mapeoData(form: any) {
    let solicitud: SolicitudReferenciaComercial = {
      "id_solicitud": this.id_solicitud,
      "id_documento_identidad": 1,
      "numero_documento": form.numero_documento,
      "razon_social": form.razon_social,
      "contacto": form.contacto,
      "cargo": form.cargo,
      "telefono": form.telefono
    }
    return solicitud;
  }

  eliminar(id:number){
    console.log("eliminarReferencia"+id);
    this.solicitudService.eliminarSolicitudReferenciaComercial(id).then(data=>{
      this.listar();
    })

  }

  limpiarCampos(){
    this.formulary.get("numero_documento").setValue("");
    this.formulary.get("razon_social").setValue("");
    this.formulary.get("contacto").setValue("");
    this.formulary.get("cargo").setValue("");
    this.formulary.get("telefono").setValue("");
  }

}
