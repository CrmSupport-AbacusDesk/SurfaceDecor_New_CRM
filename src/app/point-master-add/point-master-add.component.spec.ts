import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMasterAddComponent } from './point-master-add.component';

describe('PointMasterAddComponent', () => {
  let component: PointMasterAddComponent;
  let fixture: ComponentFixture<PointMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
