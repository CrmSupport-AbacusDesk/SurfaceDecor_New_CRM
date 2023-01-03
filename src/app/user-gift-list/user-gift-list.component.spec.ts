import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGiftListComponent } from './user-gift-list.component';

describe('UserGiftListComponent', () => {
  let component: UserGiftListComponent;
  let fixture: ComponentFixture<UserGiftListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGiftListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
