import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentiveMasterAddComponent } from './incentive-master-add.component';

describe('IncentiveMasterAddComponent', () => {
  let component: IncentiveMasterAddComponent;
  let fixture: ComponentFixture<IncentiveMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentiveMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentiveMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
