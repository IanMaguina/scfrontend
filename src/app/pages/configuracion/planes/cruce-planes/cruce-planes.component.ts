import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cruce-planes',
  templateUrl: './cruce-planes.component.html',
  styles: [
  ]
})
export class CrucePlanesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'plan'];
  //poner el model
  listadoPlanes:any[] =[
    {id:4, nombre:"PLan d"},
    {id:1, nombre:"PLan a"},
    {id:3, nombre:"PLan b"},
    {id:2, nombre:"PLan c"},
  ];
  constructor() { }

  ngOnInit(): void {
    console.log("ngInit");
  }

  guardarCrucePlanes(){
    console.log("guardarCrucePlanes");
  }


  onChangeCruce(element:any){
    console.log("onChangeCruce");
  }
}
