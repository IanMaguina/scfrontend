import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tab-estados-financieros-sc',
  templateUrl: './tab-estados-financieros-sc.component.html',
  styles: [
  ]
})
export class TabEstadosFinancierosScComponent implements OnInit {


  adjuntarfinancieros: number = 1;
  motivofinancieros: number = 2;
  estadosfinancieros = new FormControl('auto');
  constructor() { }

  ngOnInit(): void {
  }
}
