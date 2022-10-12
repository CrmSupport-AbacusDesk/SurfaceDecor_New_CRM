import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubDealerModalComponent } from './add-sub-dealer-modal.component';

describe('AddSubDealerModalComponent', () => {
  let component: AddSubDealerModalComponent;
  let fixture: ComponentFixture<AddSubDealerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubDealerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubDealerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
