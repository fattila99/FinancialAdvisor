import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyItemsComponent } from './monthly-items.component';

describe('MonthlyItemsComponent', () => {
  let component: MonthlyItemsComponent;
  let fixture: ComponentFixture<MonthlyItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
