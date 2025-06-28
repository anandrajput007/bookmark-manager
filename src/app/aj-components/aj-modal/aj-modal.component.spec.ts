import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjModalComponent } from './aj-modal.component';

describe('AjModalComponent', () => {
  let component: AjModalComponent;
  let fixture: ComponentFixture<AjModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjModalComponent]
    });
    fixture = TestBed.createComponent(AjModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
