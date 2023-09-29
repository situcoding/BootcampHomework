import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPasswordUpdateComponent } from './client-password-update.component';

describe('ClientPasswordUpdateComponent', () => {
  let component: ClientPasswordUpdateComponent;
  let fixture: ComponentFixture<ClientPasswordUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPasswordUpdateComponent]
    });
    fixture = TestBed.createComponent(ClientPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
