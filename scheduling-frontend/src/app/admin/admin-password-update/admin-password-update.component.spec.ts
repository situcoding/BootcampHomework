import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordUpdateComponent } from './admin-password-update.component';

describe('AdminPasswordUpdateComponent', () => {
  let component: AdminPasswordUpdateComponent;
  let fixture: ComponentFixture<AdminPasswordUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPasswordUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
