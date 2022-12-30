import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGiftAddComponent } from './user-gift-add.component';

describe('UserGiftAddComponent', () => {
  let component: UserGiftAddComponent;
  let fixture: ComponentFixture<UserGiftAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGiftAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGiftAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
