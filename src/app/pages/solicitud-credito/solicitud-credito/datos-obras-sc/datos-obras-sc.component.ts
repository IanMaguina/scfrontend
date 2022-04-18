import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-obras-sc',
  templateUrl: './datos-obras-sc.component.html',
  styles: [
  ]
})
export class DatosObrasScComponent implements OnInit {

  @Output() onThirdFormGroup: EventEmitter<any> = new EventEmitter();
  thirdFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

}
