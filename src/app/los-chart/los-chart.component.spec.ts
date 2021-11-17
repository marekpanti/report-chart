import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosChartComponent } from './los-chart.component';

describe('LosChartComponent', () => {
  let component: LosChartComponent;
  let fixture: ComponentFixture<LosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
