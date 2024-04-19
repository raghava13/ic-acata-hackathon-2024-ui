import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpChartComponent } from './nlp-chart.component';

describe('NlpChartComponent', () => {
  let component: NlpChartComponent;
  let fixture: ComponentFixture<NlpChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NlpChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
