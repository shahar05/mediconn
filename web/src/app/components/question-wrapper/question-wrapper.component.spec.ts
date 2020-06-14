import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionWrapperComponent } from './question-wrapper.component';

describe('QuestionWrapperComponent', () => {
  let component: QuestionWrapperComponent;
  let fixture: ComponentFixture<QuestionWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
