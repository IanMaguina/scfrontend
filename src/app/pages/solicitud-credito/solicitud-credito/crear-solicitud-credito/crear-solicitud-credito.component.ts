import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-crear-solicitud-credito',
  templateUrl: './crear-solicitud-credito.component.html',
  styles: [
  ]
})
export class CrearSolicitudCreditoComponent {
  
  
  /* datos cliente */
  firstForm:FormGroup;
  /* datos planes */
 /*  secondForm:FormGroup; */
  /* datos obras */
  thirdForm:FormGroup;
  /* datos adjuntos */
  fourthForm:FormGroup;

  
 constructor(){}

 onFirstFormGroupEvent(_event){
   this.firstForm = _event;
 }
 /* onSecondFormGroupEvent(_event){
   this.secondForm = _event;
 } */
 onThirdFormGroupEvent(_event){
   this.thirdForm = _event;
 }
 onFourthFormGroupEvent(_event){
   this.fourthForm = _event;
 }
}