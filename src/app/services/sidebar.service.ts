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
     svg: 'assets/Home_Siscred.png', 
     children: [
        { name: 'Principal', url: '/' },
      ]
    },
    {
      name: 'Solicitud de Crédito',
      icono: 'credit_card',
      svg:  'assets/LC.png',
      toolTip: 'Solicitud de Crédito',
      children: [
        { name: 'Nueva Solicitud', url: 'app/solicitudcredito/nuevaSolicitudCredito' },
        { name: 'Bandeja de Pendientes', url: 'app/solicitudcredito/bandejaMisPendientes' },
        { name: 'Consultas', url: '/' },
        { name: 'Solicitud de Grupo', url: 'app/solicitudcredito/crearSolicitudGrupo' }, 
        { name: 'Solicitud de Consorcio', url: 'app/solicitudcredito/crearSolicitudConsorcio' }, 
       
      ]
    },
    {
      name: 'Condición de Pago',
      icono: 'SolicitudCP',
      svg: 'assets/CP.png',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud', url: 'app/solicitudcondicionpago/nuevasolicitudcondicionpago' },
        { name: 'Bandeja de Pendientes', url: 'app/solicitudcondicionpago/bandejacondicionpago' },
        { name: 'Consultas', url: '/' },
       
      ]
    },
    {
      name: 'Traslados',
      icono: 'Traslados',
      svg:  'assets/Traslados.png',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud', url: '/' },
        { name: 'Bandeja de Pendientes', url: '/' },
        { name: 'Consultas', url: '/' },
       
      ]
    },
    {
      name: 'Sobregiros',
      icono: 'Sobregiros',
      svg:  'assets/Sobregiros.png',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud', url: '/' },
        { name: 'Bandeja de Pendientes', url: '/' },
        { name: 'Consultas', url: '/' },
       
      ]
    },
    {
      name: 'Revisión Mensual',
      icono: 'Rmensual',
      svg:  'assets/RevisionMensual.png',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud', url: '/' },
        { name: 'Bandeja de Pendientes', url: '/' },
        { name: 'Consultas', url: '/' },
       
      ]
    },
    {
      name: 'Documentos Valorados',
      icono: 'Dvalorados',
      svg:  'assets/DV.png',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud', url: '/' },
        { name: 'Bandeja de Pendientes', url: '/' },
        { name: 'Consultas', url: '/' },
       
      ]
    },
    {
      name: 'Reportes',
      icono: 'Reportes',
      svg:  'assets/Reportes.png',
      toolTip: 'Solicitud de Condición de Pago',
      children: [
        { name: 'Nueva Solicitud', url: '/' },
        { name: 'Bandeja de Pendientes', url: '/' },
        { name: 'Consultas', url: '/' },
       
      ]
    },
    {
      name: 'Configuración',
      icono: 'build',
      svg: 'assets/Config.png',
      //svg:  '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"> <g id="Grupo_956" data-name="Grupo 956" transform="translate(20520 13677)"> <rect id="Rectángulo_88" data-name="Rectángulo 88" width="48" height="48" transform="translate(-20520 -13677)" fill="transparent"/> <circle id="Elipse_19" data-name="Elipse 19" cx="4" cy="4" r="4" transform="translate(-20500.5 -13656.5)" fill="none" stroke="#6B6B6B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/> <g id="Grupo_146" data-name="Grupo 146" transform="translate(-21110.982 -13926.801)"> <path id="Trazado_5" data-name="Trazado 5" d="M617.523,290.465h-6.415a.537.537,0,0,1-.538-.538v-3.39a12.907,12.907,0,0,1-2.375-.986l-2.4,2.4a.538.538,0,0,1-.761,0l-4.536-4.536a.537.537,0,0,1,0-.761l2.4-2.4a12.908,12.908,0,0,1-.986-2.375h-3.391a.538.538,0,0,1-.538-.538v-6.415a.538.538,0,0,1,.538-.538h3.391a12.879,12.879,0,0,1,.986-2.375l-2.4-2.4a.537.537,0,0,1,0-.761l4.536-4.537a.54.54,0,0,1,.761,0l2.4,2.4a12.84,12.84,0,0,1,2.375-.986v-3.391a.538.538,0,0,1,.538-.538h6.415a.538.538,0,0,1,.538.538v3.391a12.783,12.783,0,0,1,2.375.986l2.4-2.4a.54.54,0,0,1,.761,0l4.536,4.537a.537.537,0,0,1,0,.761l-2.4,2.4a12.841,12.841,0,0,1,.986,2.375h3.391a.538.538,0,0,1,.538.538v6.415a.538.538,0,0,1-.538.538h-3.391a12.869,12.869,0,0,1-.986,2.375l2.4,2.4a.537.537,0,0,1,0,.761L623.6,287.95a.538.538,0,0,1-.761,0l-2.4-2.4a12.907,12.907,0,0,1-2.375.986v3.39A.537.537,0,0,1,617.523,290.465Zm-5.877-1.076h5.339V286.13a.539.539,0,0,1,.4-.52,11.768,11.768,0,0,0,2.874-1.193.539.539,0,0,1,.651.086l2.306,2.306,3.775-3.776-2.306-2.306a.539.539,0,0,1-.085-.65,11.83,11.83,0,0,0,1.193-2.875.538.538,0,0,1,.52-.4h3.259v-5.339h-3.259a.538.538,0,0,1-.52-.4,11.831,11.831,0,0,0-1.193-2.875.539.539,0,0,1,.085-.65l2.306-2.306-3.775-3.775-2.306,2.306a.539.539,0,0,1-.651.085,11.791,11.791,0,0,0-2.874-1.193.538.538,0,0,1-.4-.52v-3.259h-5.339v3.259a.538.538,0,0,1-.4.52,11.8,11.8,0,0,0-2.875,1.193.537.537,0,0,1-.65-.085l-2.306-2.306-3.776,3.775,2.306,2.306a.537.537,0,0,1,.086.65,11.778,11.778,0,0,0-1.193,2.875.539.539,0,0,1-.521.4H599.06V276.8h3.258a.54.54,0,0,1,.521.4,11.762,11.762,0,0,0,1.193,2.875.537.537,0,0,1-.086.65l-2.306,2.306,3.776,3.776,2.306-2.306a.537.537,0,0,1,.65-.086,11.759,11.759,0,0,0,2.875,1.193.539.539,0,0,1,.4.52Z" fill="#6B6B6B"/> <path id="Trazado_6" data-name="Trazado 6" d="M614.316,284.142a10.008,10.008,0,1,1,0-20.017.538.538,0,1,1,0,1.076,8.932,8.932,0,1,0,6.316,2.616.538.538,0,0,1,.761-.761,10.009,10.009,0,0,1-7.077,17.086Z" fill="#6B6B6B"/> </g> </g> </svg>',
      toolTip: 'Configuración',
      children: [
        { name: 'Usuarios', url: 'app/configuracion/usuarios' },
        { name: 'Estrategias', url: 'app/configuracion/estrategias' },
        { name: 'Consorcios', url: 'app/configuracion/consorcios' },
        { name: 'Grupos', url: 'app/configuracion/grupos' },
        { name: 'Planes', url: 'app/configuracion/planes' },
        { name: 'Documentos Valorados', url: 'app/configuracion/tipodocumentovalorado' },
        { name: 'Suplencias', url: 'app/configuracion/suplencias' },
        { name: 'Asistente de facturacion', url: 'app/configuracion/asistentefacturacion' },
        { name: 'Aprobador adicional', url: 'app/configuracion/aprobadoradicional' },
      ]
    },
  ];


  constructor() {
    console.log("test menu");
  }
}
