import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditorWrapperComponent } from './question-editor-wrapper.component';

describe('QuestionEditorWrapperComponent', () => {
  let component: QuestionEditorWrapperComponent;
  let fixture: ComponentFixture<QuestionEditorWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditorWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
