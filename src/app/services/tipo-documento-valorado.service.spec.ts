import { TestBed } from '@angular/core/testing';

import { TipoDocumentoValoradoService } from './tipo-documento-valorado.service';

describe('TipoDocumentoValoradoService', () => {
  let service: TipoDocumentoValoradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocumentoValoradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
