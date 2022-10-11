import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomEnquiryListComponent } from './showroom-enquiry-list.component';

describe('ShowroomEnquiryListComponent', () => {
  let component: ShowroomEnquiryListComponent;
  let fixture: ComponentFixture<ShowroomEnquiryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowroomEnquiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowroomEnquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
