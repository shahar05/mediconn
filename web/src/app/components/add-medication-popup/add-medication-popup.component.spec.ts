import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicationPopupComponent } from './add-medication-popup.component';

describe('AddMedicationPopupComponent', () => {
  let component: AddMedicationPopupComponent;
  let fixture: ComponentFixture<AddMedicationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
