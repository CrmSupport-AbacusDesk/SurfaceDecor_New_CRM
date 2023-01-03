import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleUserReportComponent } from './sale-user-report.component';

describe('SaleUserReportComponent', () => {
  let component: SaleUserReportComponent;
  let fixture: ComponentFixture<SaleUserReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleUserReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleUserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
