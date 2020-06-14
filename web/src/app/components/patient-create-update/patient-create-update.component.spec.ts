import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreateUpdateComponent } from './patient-create-update.component';

describe('PatientCreateUpdateComponent', () => {
  let component: PatientCreateUpdateComponent;
  let fixture: ComponentFixture<PatientCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
