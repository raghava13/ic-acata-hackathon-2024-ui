import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpAccuracyComponent } from './nlp-accuracy.component';

describe('NlpAccuracyComponent', () => {
  let component: NlpAccuracyComponent;
  let fixture: ComponentFixture<NlpAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpAccuracyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NlpAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
