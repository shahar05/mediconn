import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUpdateCreateComponent } from './question-update-create.component';

describe('QuestionUpdateCreateComponent', () => {
  let component: QuestionUpdateCreateComponent;
  let fixture: ComponentFixture<QuestionUpdateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUpdateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUpdateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
