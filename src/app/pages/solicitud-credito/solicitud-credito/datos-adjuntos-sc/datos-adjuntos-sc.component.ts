import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-datos-adjuntos-sc',
  templateUrl: './datos-adjuntos-sc.component.html',
  styles: [
  ]
})
export class DatosAdjuntosScComponent implements OnInit {
  @Output() onFourthFormGroup: EventEmitter<any> = new EventEmitter();
  fourthFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
 
}
