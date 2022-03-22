import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: ['./nopagefound.component.css',
  ]
})
export class NopagefoundComponent {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  regresar(){
    this.router.navigate(['dashboard']);
  }

}
