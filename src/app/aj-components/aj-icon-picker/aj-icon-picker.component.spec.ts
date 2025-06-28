import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjIconPickerComponent } from './aj-icon-picker.component';

describe('AjIconPickerComponent', () => {
  let component: AjIconPickerComponent;
  let fixture: ComponentFixture<AjIconPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjIconPickerComponent]
    });
    fixture = TestBed.createComponent(AjIconPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
