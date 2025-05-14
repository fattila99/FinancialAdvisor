import { TestBed } from '@angular/core/testing';

import { MonthlyPlanService } from './monthly-plan.service';

describe('MonthlyPlanService', () => {
  let service: MonthlyPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
