import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemRequestComponent } from './redeem-request.component';

describe('RedeemRequestComponent', () => {
  let component: RedeemRequestComponent;
  let fixture: ComponentFixture<RedeemRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
