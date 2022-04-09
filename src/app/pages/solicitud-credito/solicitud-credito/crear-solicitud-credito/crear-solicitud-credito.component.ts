import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-crear-solicitud-credito',
  templateUrl: './crear-solicitud-credito.component.html',
  styles: [
  ]
})
export class CrearSolicitudCreditoComponent {
/* to settings constantes */
radioGrupo: number =1;
radioConsorcio: number =2;
radioEmpresa: number =3;

/* end */

cliente:number=1;

  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  thirdFormGroup:FormGroup;
  fourthFormGroup:FormGroup;

  
  ClientSelectorControl = new FormControl('auto');

  //stepperOrientation: Observable<StepperOrientation>;
  constructor(
    private _formBuilder: FormBuilder, 
    private formValidatorService: FormValidatorService,
    /* breakpointObserver: BreakpointObserver */
    ) {
      this.firstFormGroup = this._formBuilder.group({
        clientSelector: [this.cliente,this.ClientSelectorControl, Validators.required],
        nombreGrupo: [''],
        rucGrupo: [''],
        razonSocialEmpresa: [''],
        rucEmpresa: [''],
        razonSocialConsorcio: [''],
        rucConsorcio: [''],
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required],
      });
      this.fourthFormGroup = this._formBuilder.group({
        fourthCtrl: ['', Validators.required],
      });
    /* this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical'))); */
  }
  guardarSeccionInformacion(element:any){

  }
  dosomething(element:any){
    console.log(JSON.stringify(element));
  }
}