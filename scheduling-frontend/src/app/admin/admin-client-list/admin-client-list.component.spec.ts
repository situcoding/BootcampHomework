import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientListComponent } from './admin-client-list.component';

describe('AdminClientListComponent', () => {
  let component: AdminClientListComponent;
  let fixture: ComponentFixture<AdminClientListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientListComponent]
    });
    fixture = TestBed.createComponent(AdminClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
