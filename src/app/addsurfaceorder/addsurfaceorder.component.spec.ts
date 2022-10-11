import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsurfaceorderComponent } from './addsurfaceorder.component';

describe('AddsurfaceorderComponent', () => {
  let component: AddsurfaceorderComponent;
  let fixture: ComponentFixture<AddsurfaceorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsurfaceorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsurfaceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
