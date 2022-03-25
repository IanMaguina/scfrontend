import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
    {
      titulo: 'Dashboard',
      icono: 'edit',
      submenu:[
        {titulo:'Principal', url: '/'},
      ]
    },
    {
      titulo: 'Configuración',
      icono: 'edit',
      submenu:[
        {titulo:'Usuarios', url: '/usuarios'},
        {titulo:'Estrategias', url: '/estrategias'},
        {titulo:'Consorcios', url: '/consorcios'},
        {titulo:'Grupos', url: '/grupos'},
        {titulo:'Planes', url: '/planes'},
        {titulo:'Tipo de documento valorado', url: '/tipodocumentovalorado'},
        {titulo:'Suplencias', url: '/suplencias'},
        {titulo:'Asistente de facturacion', url: '/asistentefacturacion'},
        {titulo:'Aprobador adicional', url: '/aprobadoradicional'},
      ]
    },
  ];


  constructor() {
    console.log("test menu");
   }
}
