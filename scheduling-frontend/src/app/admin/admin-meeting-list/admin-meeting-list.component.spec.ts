import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMeetingListComponent } from './admin-meeting-list.component';

describe('AdminMeetingListComponent', () => {
  let component: AdminMeetingListComponent;
  let fixture: ComponentFixture<AdminMeetingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMeetingListComponent]
    });
    fixture = TestBed.createComponent(AdminMeetingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
