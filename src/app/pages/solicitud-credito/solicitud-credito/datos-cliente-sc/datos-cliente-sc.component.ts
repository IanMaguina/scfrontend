import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ConsorciosCoincidentesDialogComponent } from './consorcios-coincidentes-dialog/consorcios-coincidentes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-datos-cliente-sc',
  templateUrl: './datos-cliente-sc.component.html',
  styles: [
  ]
})
export class DatosClienteScComponent implements OnInit {

  @Output() onFirstFormGroup: EventEmitter<any> = new EventEmitter();
  firstFormGroup:FormGroup;
  /* to settings constantes */
  radioGrupo: number =1;
  radioConsorcio: number =2;
  radioEmpresa: number =3;
  /* end */
  cliente:number=1;
  ClientSelectorControl = new FormControl('auto');
  panelOpenState = false;

  /* toolTip control */
  positionOption: TooltipPosition =  'above';
  //stepperOrientation: Observable<StepperOrientation>;
  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
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


    }
    ngOnInit(): void {
      console.log("ngOnInit");
    }


    guardarSeccionInformacion(element:any){
      console.log("guardarSeccionInformacion");
    }
    dosomething(element:any){
      console.log(JSON.stringify(element));
    }

    openBuscarCoincidentes(data:any) {
      console.log(JSON.stringify(data));
      this.matDialog.open(ConsorciosCoincidentesDialogComponent, {
        disableClose: true,
        width:"400px",
        data:data
      });


    }

  }


  /* this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical'))); */
