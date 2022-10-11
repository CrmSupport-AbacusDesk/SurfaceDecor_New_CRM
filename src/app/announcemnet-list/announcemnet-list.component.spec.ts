import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncemnetListComponent } from './announcemnet-list.component';

describe('AnnouncemnetListComponent', () => {
  let component: AnnouncemnetListComponent;
  let fixture: ComponentFixture<AnnouncemnetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncemnetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncemnetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
