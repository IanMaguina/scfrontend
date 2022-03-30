import { Injectable } from '@angular/core';
import { MenuNode } from '../models/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: MenuNode[] = [
    {
      name: 'Dashboard',
      icono: 'dashboard',
      children: [
        { name: 'Principal', url: '/' },
      ]
    },
    {
      name: 'Configuración',
      icono: 'build',
      toolTip: 'Configuración',
      children: [
        { name: 'Usuarios', url: 'configuracion/usuarios' },
        { name: 'Estrategias', url: 'configuracion/estrategias' },
        { name: 'Consorcios', url: 'configuracion/consorcios' },
        { name: 'Grupos', url: 'configuracion/grupos' },
        { name: 'Planes', url: 'configuracion/planes' },
        { name: 'Tipo de documento valorado', url: 'configuracion/tipodocumentovalorado' },
        { name: 'Suplencias', url: 'configuracion/suplencias' },
        { name: 'Asistente de facturacion', url: 'configuracion/asistentefacturacion' },
        { name: 'Aprobador adicional', url: 'configuracion/aprobadoradicional' },
      ]
    },
  ];


  constructor() {
    console.log("test menu");
  }
}
