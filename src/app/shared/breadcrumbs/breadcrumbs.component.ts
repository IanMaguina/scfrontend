import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public ruta: string;
  public rutaSubs$: Subscription;
  constructor(
    private router: Router,
  ) {
    this.rutaSubs$ = this.getArgumentosRuta()
    .subscribe(({ titulo, ruta }) => {
      this.ruta = ruta;
      document.title = `SISCRED - ${ titulo }`;
    });
  }
  ngOnDestroy(): void {
    this.rutaSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    );
  }


}
