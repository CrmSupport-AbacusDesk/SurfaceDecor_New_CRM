import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingdocumentComponent } from './billingdocument.component';

describe('BillingdocumentComponent', () => {
  let component: BillingdocumentComponent;
  let fixture: ComponentFixture<BillingdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
