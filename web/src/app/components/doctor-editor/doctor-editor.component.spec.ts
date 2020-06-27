import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditorComponent } from './doctor-editor.component';

describe('DoctorEditorComponent', () => {
  let component: DoctorEditorComponent;
  let fixture: ComponentFixture<DoctorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
