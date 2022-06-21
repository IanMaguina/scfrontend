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
        { name: 'Usuarios', url: 'app/configuracion/usuarios' },
        { name: 'Estrategias', url: 'app/configuracion/estrategias' },
        { name: 'Consorcios', url: 'app/configuracion/consorcios' },
        { name: 'Grupos', url: 'app/configuracion/grupos' },
        { name: 'Planes', url: 'app/configuracion/planes' },
        { name: 'Tipo de documento valorado', url: 'app/configuracion/tipodocumentovalorado' },
        { name: 'Suplencias', url: 'app/configuracion/suplencias' },
        { name: 'Asistente de facturacion', url: 'app/configuracion/asistentefacturacion' },
        { name: 'Aprobador adicional', url: 'app/configuracion/aprobadoradicional' },
      ]
    },
    {
      name: 'Solicitud de Crédito',
      icono: 'credit_card',
      toolTip: 'Solicitud de Crédito',
      children: [
        { name: 'Nueva Solicitud de Crédito', url: 'app/solicitudcredito/nuevasolicitudcredito' },
        { name: 'bandeja de Solicitudes Pendientes', url: 'app/solicitudcredito/bandejaMisPendiendes' },
        { name: 'Solicitud de Grupo', url: 'app/solicitudcredito/crearSolicitudGrupo' }, 
        { name: 'Solicitud de Consorcio', url: 'app/solicitudcredito/crearSolicitudConsorcio' }, 
       
      ]
    },
    {
      name: 'Solicitud de Condición de Pago',
      icono: 'credit_card',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud de Condición de Pago', url: 'app/solicitudcondicionpago/nuevasolicitudcondicionpago' },
        { name: 'bandeja de Solicitudes de Condición de Pago', url: 'app/solicitudcondicionpago/bandejacondicionpago' },
       
      ]
    },
  ];


  constructor() {
    console.log("test menu");
  }
}
