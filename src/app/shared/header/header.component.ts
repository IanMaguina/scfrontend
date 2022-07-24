import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.interface';
import { SideNavService } from '../sidebar/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter<void>();
  
  userInfo?: Usuario;
  nombre?: string = '';
  constructor(
    
    private autenticacionService: AutenticacionService,) {
     
    this.retornaUsuario().subscribe( (valor) =>{
      this.nombre = valor;
    },
    (error) => console.log('Error:',error),
    () => console.log('terminó el observer')
    );

  }

  retornaUsuario(): Observable<string>{
    return new Observable<string>( observer =>{
      const intervalo = setInterval(() =>{
        this.userInfo = this.autenticacionService.getUserInfo();
        observer.next( this.userInfo.nombre);

        if(this.userInfo.nombre != ''){
          clearInterval(intervalo);
          observer.complete();
        }
      },1000)
    })
  }

  

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }



}
