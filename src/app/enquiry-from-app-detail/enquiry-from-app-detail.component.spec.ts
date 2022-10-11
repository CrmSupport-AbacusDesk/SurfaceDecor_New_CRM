import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryFromAppDetailComponent } from './enquiry-from-app-detail.component';

describe('EnquiryFromAppDetailComponent', () => {
  let component: EnquiryFromAppDetailComponent;
  let fixture: ComponentFixture<EnquiryFromAppDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryFromAppDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryFromAppDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
