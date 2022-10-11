import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncemneAddComponent } from './announcemne-add.component';

describe('AnnouncemneAddComponent', () => {
  let component: AnnouncemneAddComponent;
  let fixture: ComponentFixture<AnnouncemneAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncemneAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncemneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
