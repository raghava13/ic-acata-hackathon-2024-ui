import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpAccuracyReportComponent } from './nlp-accuracy-report.component';

describe('NlpAccuracyReportComponent', () => {
  let component: NlpAccuracyReportComponent;
  let fixture: ComponentFixture<NlpAccuracyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpAccuracyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NlpAccuracyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
