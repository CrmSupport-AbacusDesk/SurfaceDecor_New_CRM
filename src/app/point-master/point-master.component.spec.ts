import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMasterComponent } from './point-master.component';

describe('PointMasterComponent', () => {
  let component: PointMasterComponent;
  let fixture: ComponentFixture<PointMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
