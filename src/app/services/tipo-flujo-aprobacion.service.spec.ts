import { TestBed } from '@angular/core/testing';

import { TipoFlujoAprobacionService } from './tipo-flujo-aprobacion.service';

describe('TipoFlujoAprobacionService', () => {
  let service: TipoFlujoAprobacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFlujoAprobacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
