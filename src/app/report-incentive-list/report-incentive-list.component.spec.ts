import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncentiveListComponent } from './report-incentive-list.component';

describe('ReportIncentiveListComponent', () => {
  let component: ReportIncentiveListComponent;
  let fixture: ComponentFixture<ReportIncentiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIncentiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncentiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
