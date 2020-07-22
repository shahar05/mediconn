import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileAdminComponent } from './patient-profile-admin.component';

describe('PatientProfileAdminComponent', () => {
  let component: PatientProfileAdminComponent;
  let fixture: ComponentFixture<PatientProfileAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfileAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
