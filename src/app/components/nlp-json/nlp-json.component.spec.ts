import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpJsonComponent } from './nlp-json.component';

describe('NlpJsonComponent', () => {
  let component: NlpJsonComponent;
  let fixture: ComponentFixture<NlpJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpJsonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NlpJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
