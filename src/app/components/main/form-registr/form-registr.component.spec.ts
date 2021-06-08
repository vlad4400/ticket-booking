import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistrComponent } from './form-registr.component';

describe('FormRegistrComponent', () => {
  let component: FormRegistrComponent;
  let fixture: ComponentFixture<FormRegistrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
