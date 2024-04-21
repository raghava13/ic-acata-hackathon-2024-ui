import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpElementComponent } from './nlp-element.component';

describe('NlpElementComponent', () => {
  let component: NlpElementComponent;
  let fixture: ComponentFixture<NlpElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NlpElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
