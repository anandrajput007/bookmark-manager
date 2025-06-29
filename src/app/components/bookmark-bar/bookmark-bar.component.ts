import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionsService, Collection } from '../../services/collections.service';
import { ViewModeService, ViewMode } from '../../services/view-mode.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bookmark-bar',
  templateUrl: './bookmark-bar.component.html',
  styleUrls: ['./bookmark-bar.component.scss']
})
export class BookmarkBarComponent implements OnInit, OnDestroy {
  collections: Collection[] = [];
  currentViewMode: ViewMode = 'grid';
  loading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private collectionsService: CollectionsService,
    private viewModeService: ViewModeService
  ) {}

  ngOnInit(): void {
    this.subscribeToCollections();
    this.subscribeToViewMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Subscribe to collections changes
   */
  private subscribeToCollections(): void {
    this.loading = true;
    this.error = null;

    this.collectionsService.collections$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (collections) => {
          this.collections = collections;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading collections:', error);
          this.error = 'Failed to load collections. Please try again.';
          this.loading = false;
        }
      });

    // Load initial data if not already loaded
    this.collectionsService.getCollections();
  }

  /**
   * Subscribe to view mode changes
   */
  private subscribeToViewMode(): void {
    this.viewModeService.viewMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(mode => {
        this.currentViewMode = mode;
      });
  }

  /**
   * Toggle collection favorite status
   */
  toggleFavorite(collection: Collection): void {
    if (collection.collectionId) {
      this.collectionsService.updateCollection(collection.collectionId, { isFav: !collection.isFav })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          error: (error) => {
            console.error('Error toggling collection favorite:', error);
            // Revert the change on error
            collection.isFav = !collection.isFav;
          }
        });
    }
  }

  /**
   * Toggle bookmark favorite status
   */
  toggleBookmarkFavorite(bookmark: any): void {
    // This will be handled by the bookmarks service
    // For now, just toggle locally
    bookmark.isFav = !bookmark.isFav;
  }

  /**
   * Toggle collection expansion
   */
  toggleCollectionExpansion(collection: Collection): void {
    this.collectionsService.toggleCollectionExpansion(collection);
  }

  /**
   * Refresh collections
   */
  refreshCollections(): void {
    this.collectionsService.refreshCollections();
  }
}
