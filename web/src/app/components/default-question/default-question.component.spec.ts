import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultQuestionComponent } from './default-question.component';

describe('DefaultQuestionComponent', () => {
  let component: DefaultQuestionComponent;
  let fixture: ComponentFixture<DefaultQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
