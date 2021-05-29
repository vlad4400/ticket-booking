import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigMenuComponent } from './big-menu.component';

describe('BigMenuComponent', () => {
  let component: BigMenuComponent;
  let fixture: ComponentFixture<BigMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
