import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Obra } from 'src/app/models/obra.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-datos-obras-sc',
  templateUrl: './datos-obras-sc.component.html',
  styles: [
  ]
})
export class DatosObrasScComponent implements OnInit {

  @Output() onThirdFormGroup: EventEmitter<any> = new EventEmitter();
  @Input() id_solicitud: number;
  thirdFormGroup: FormGroup;
  formulary: FormGroup;
  listadoObras: Obra[] = [
    {
      id_solicitud: 1,
      obra_codigo_isicom: '1515',
      dueno: 'jack O neil',
      ubicacion: 'Lima',
      plazo: '48 Meses',
      nombre: 'Obra Las Bambas',
      informacion_adicional: '',
      fecha_inicio_obra: '15/01/2020',
      fecha_final_obra: '20/06/2023'
    },
    {
      id_solicitud: 1,
      obra_codigo_isicom: '1515',
      dueno: 'jack O neil',
      ubicacion: 'Lima',
      plazo: '48 Meses',
      nombre: 'Obra Vichapampa',
      informacion_adicional: '',
      fecha_inicio_obra: '15/01/2020',
      fecha_final_obra: '20/06/2023'
    },
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private solicitudService: SolicitudService,

  ) {
    this.thirdFormGroup = this._formBuilder.group({
      codigo_obra: ['', Validators.required],
    });
    this.formulary = this._formBuilder.group({
      informacion_adicional: [''],
      fecha_inicio_atencion: [''],
      fecha_final_atencion: [''],
    });

  }
  ngOnInit(): void {
    console.log("object");
  }

  async getDataObra(form: any) {
    //console.log("dato salido: "+form.codigo_obra);
    await this.solicitudService.listarObra(form.codigo_obra).then(data => {
      //console.log("informacion de la obra: "+ JSON.stringify(data));
      //mapping
      let obra_solicitud = this.mapeoObra(data[0]);
      //aqui agregamos la obra

      console.log("informacion de la obra: " + JSON.stringify(obra_solicitud));
      /* this.solicitudService.asignarObra(obra_solicitud).then((response) => {

      }) */
    })
  }


  async mapeoObra(data: any) {
    let obraSolicitud: Obra = {
      id_solicitud: this.id_solicitud,
      obra_codigo_isicom: data.codigo_obra,
      dueno: data.responsable,
      ubicacion: data.ubicacion,
      plazo: data.duracion,
      informacion_adicional: data.nombre_obra,
      fecha_inicio_obra: data.fecha_inicio,
      fecha_final_obra: data.fecha_fin,
      /* fecha_inicio_atencion:,
      fecha_final_atencion:, */

    }
    return obraSolicitud;
  }

  listarObras() {
    /* this.solicitudService.listarSolicitudObras().then(data =>{
      this.listadoObras = data;
    }); */
  }

  quitarObra() {

  }

  agregarObra() {

  }
  guardarDatosObra(form: any) {

  }



}
