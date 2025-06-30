import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjToasterComponent } from './aj-toaster.component';

describe('AjToasterComponent', () => {
  let component: AjToasterComponent;
  let fixture: ComponentFixture<AjToasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjToasterComponent]
    });
    fixture = TestBed.createComponent(AjToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
