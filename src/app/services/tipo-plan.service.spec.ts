import { TestBed } from '@angular/core/testing';

import { TipoPlanService } from './tipo-plan.service';

describe('TipoPlanService', () => {
  let service: TipoPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
