import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPlansComponent } from './monthly-plans.component';

describe('MonthlyPlansComponent', () => {
  let component: MonthlyPlansComponent;
  let fixture: ComponentFixture<MonthlyPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
