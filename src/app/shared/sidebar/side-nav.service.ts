import { Injectable } from '@angular/core';
// import { DrawerComponent } from './drawer/drawer.component';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SideNavService {
  constructor() { }
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenav.opened = true;
    return this.sidenav.open();
  }

  public close() {
    console.log('close')
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }
}
