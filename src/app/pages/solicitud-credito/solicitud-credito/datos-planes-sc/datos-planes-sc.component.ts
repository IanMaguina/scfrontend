import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-planes-sc',
  templateUrl: './datos-planes-sc.component.html',
  styles: [
  ]
})
export class DatosPlanesScComponent implements OnInit {
  @Output() onSecondFormGroup: EventEmitter<any> = new EventEmitter();
  secondFormGroup:FormGroup;
  constructor(
    private _formBuilder:FormBuilder
  ){
   this.secondFormGroup = this._formBuilder.group({
     secondCtrl: ['', Validators.required],
   });
  }
  ngOnInit(): void {
  }

}
