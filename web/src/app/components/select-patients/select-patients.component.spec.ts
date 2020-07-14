import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPatientsComponent } from './select-patients.component';

describe('SelectPatientsComponent', () => {
  let component: SelectPatientsComponent;
  let fixture: ComponentFixture<SelectPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
