import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsDialogComponent } from './sms-dialog.component';

describe('SmsDialogComponent', () => {
  let component: SmsDialogComponent;
  let fixture: ComponentFixture<SmsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
