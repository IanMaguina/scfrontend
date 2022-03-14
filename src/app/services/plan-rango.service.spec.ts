import { TestBed } from '@angular/core/testing';

import { PlanRangoService } from './plan-rango.service';

describe('PlanRangoService', () => {
  let service: PlanRangoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanRangoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
