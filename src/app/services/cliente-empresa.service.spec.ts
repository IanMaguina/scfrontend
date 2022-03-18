import { TestBed } from '@angular/core/testing';

import { ClienteEmpresaService } from './cliente-empresa.service';

describe('ClienteEmpresaService', () => {
  let service: ClienteEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
