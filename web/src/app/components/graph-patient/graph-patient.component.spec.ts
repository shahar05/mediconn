import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPatientComponent } from './graph-patient.component';

describe('GraphPatientComponent', () => {
  let component: GraphPatientComponent;
  let fixture: ComponentFixture<GraphPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
