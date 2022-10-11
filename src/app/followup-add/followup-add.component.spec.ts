import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupAddComponent } from './followup-add.component';

describe('FollowupAddComponent', () => {
  let component: FollowupAddComponent;
  let fixture: ComponentFixture<FollowupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
