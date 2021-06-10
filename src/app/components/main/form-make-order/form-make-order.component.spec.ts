import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMakeOrderComponent } from './form-make-order.component';

describe('FormMakeOrderComponent', () => {
  let component: FormMakeOrderComponent;
  let fixture: ComponentFixture<FormMakeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMakeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
