import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkBarComponent } from './bookmark-bar.component';

describe('BookmarkBarComponent', () => {
  let component: BookmarkBarComponent;
  let fixture: ComponentFixture<BookmarkBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkBarComponent]
    });
    fixture = TestBed.createComponent(BookmarkBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
