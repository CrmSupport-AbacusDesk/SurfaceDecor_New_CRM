import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemRequestStatusModalComponent } from './redeem-request-status-modal.component';

describe('RedeemRequestStatusModalComponent', () => {
  let component: RedeemRequestStatusModalComponent;
  let fixture: ComponentFixture<RedeemRequestStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemRequestStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemRequestStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
