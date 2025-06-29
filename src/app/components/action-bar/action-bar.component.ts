import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionsService, Collection, Bookmark } from '../../services/collections.service';
import { ViewModeService, ViewMode } from '../../services/view-mode.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit, OnDestroy {
  currentViewMode: ViewMode = 'grid';
  showAddCollectionModal = false;
  showAddBookmarkModal = false;

  private destroy$ = new Subject<void>();

  constructor(
    private collectionsService: CollectionsService,
    private viewModeService: ViewModeService
  ) {}

  ngOnInit(): void {
    this.subscribeToViewMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
   * Set grid view mode
   */
  setGridView(): void {
    this.viewModeService.setViewMode('grid');
  }

  /**
   * Set list view mode
   */
  setListView(): void {
    this.viewModeService.setViewMode('list');
  }

  /**
   * Open add bookmark modal
   */
  openAddBookmarkModal(): void {
    this.showAddBookmarkModal = true;
  }

  /**
   * Close add bookmark modal
   */
  closeAddBookmarkModal(): void {
    this.showAddBookmarkModal = false;
  }

  /**
   * Handle bookmark save
   */
  onSaveBookmark(bookmarkData: Bookmark): void {
    console.log('Bookmark created successfully:', bookmarkData);
    // Refresh collections to show the new bookmark
    this.collectionsService.refreshCollections();
    this.closeAddBookmarkModal();
  }

  /**
   * Open add collection modal
   */
  openAddCollectionModal(): void {
    this.showAddCollectionModal = true;
  }

  /**
   * Close add collection modal
   */
  closeAddCollectionModal(): void {
    this.showAddCollectionModal = false;
  }

  /**
   * Handle collection save
   */
  onSaveCollection(collectionData: Collection): void {
    console.log('Collection created successfully:', collectionData);
    this.closeAddCollectionModal();
  }
}
