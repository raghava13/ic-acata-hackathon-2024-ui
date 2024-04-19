import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptTuningComponent } from './prompt-tuning.component';

describe('PromptTuningComponent', () => {
  let component: PromptTuningComponent;
  let fixture: ComponentFixture<PromptTuningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptTuningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
