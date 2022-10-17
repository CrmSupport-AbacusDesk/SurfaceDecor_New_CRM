import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdealerListComponent } from './subdealer-list.component';

describe('SubdealerListComponent', () => {
  let component: SubdealerListComponent;
  let fixture: ComponentFixture<SubdealerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdealerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdealerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
