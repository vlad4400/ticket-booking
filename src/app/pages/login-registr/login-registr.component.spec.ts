import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistrComponent } from './login-registr.component';

describe('LoginRegistrComponent', () => {
  let component: LoginRegistrComponent;
  let fixture: ComponentFixture<LoginRegistrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegistrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
