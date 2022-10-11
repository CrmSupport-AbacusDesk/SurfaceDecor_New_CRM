import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryFromAppListingComponent } from './enquiry-from-app-listing.component';

describe('EnquiryFromAppListingComponent', () => {
  let component: EnquiryFromAppListingComponent;
  let fixture: ComponentFixture<EnquiryFromAppListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryFromAppListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryFromAppListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
