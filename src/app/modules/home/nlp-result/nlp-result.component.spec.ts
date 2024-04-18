import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpResultComponent } from './nlp-result.component';

describe('NlpResultComponent', () => {
  let component: NlpResultComponent;
  let fixture: ComponentFixture<NlpResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NlpResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
