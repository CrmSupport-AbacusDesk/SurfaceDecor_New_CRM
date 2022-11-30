import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentiveMasterListComponent } from './incentive-master-list.component';

describe('IncentiveMasterListComponent', () => {
  let component: IncentiveMasterListComponent;
  let fixture: ComponentFixture<IncentiveMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentiveMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentiveMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
