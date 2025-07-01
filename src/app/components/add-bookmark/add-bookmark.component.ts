import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FONT_AWESOME_ICONS } from '../../shared/data/fontawesome-icons';
import { CollectionsService, Collection, Bookmark } from '../../services/collections.service';
import { BookmarksService } from '../../services/bookmarks.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveBookmark = new EventEmitter<any>();

  bookmarkForm: FormGroup;
  selectedIcon: string = 'fa-bookmark';
  collections: Collection[] = [];
  sortedCollections: Collection[] = [];
  loading = false;
  error: string | null = null;

  // Available icons for picker
  availableIcons = FONT_AWESOME_ICONS;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private collectionsService: CollectionsService,
    private bookmarksService: BookmarksService
  ) {
    this.bookmarkForm = this.fb.group({
      collectionId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      icon: ['fa-bookmark', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCollections();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load collections from the service
   */
  loadCollections(): void {
    this.loading = true;
    this.error = null;

    this.collectionsService.getCollections()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (collections) => {
          this.collections = collections;
          // Sort collections by name in ascending order
          this.sortedCollections = [...collections].sort((a, b) => 
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading collections:', error);
          this.error = 'Failed to load collections. Please try again.';
          this.loading = false;
        }
      });
  }

  /**
   * Open modal and reset form
   */
  openModal(): void {
    this.isOpen = true;
    this.bookmarkForm.reset({ icon: 'fa-bookmark' });
    this.selectedIcon = 'fa-bookmark';
    this.error = null;
  }

  /**
   * Close modal
   */
  close(): void {
    this.isOpen = false;
    this.closeModal.emit();
  }

  /**
   * Handle icon selection
   */
  onIconSelected(icon: string): void {
    this.selectedIcon = icon;
    this.bookmarkForm.patchValue({ icon });
  }

  /**
   * Save bookmark
   */
  save(): void {
    if (this.bookmarkForm.valid) {
      const formValue = this.bookmarkForm.value;
      const selectedCollection = this.collections.find(
        col => col.name === formValue.collectionId
      );

      if (!selectedCollection) {
        this.error = 'Selected collection not found.';
        return;
      }

      const bookmarkData = {
        collectionId: selectedCollection.collectionId,
        name: formValue.name,
        url: formValue.url,
        icon: formValue.icon,
        isFav: false,
        createdDate: new Date().toISOString()
      };
      this.saveBookmark.emit(bookmarkData);
      this.close();
    }
  }
}
