import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredDialogComponent } from './expired-dialog.component';

describe('ExpiredDialogComponent', () => {
  let component: ExpiredDialogComponent;
  let fixture: ComponentFixture<ExpiredDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
