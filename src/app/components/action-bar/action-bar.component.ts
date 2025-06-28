import { Component } from '@angular/core';
import { CollectionService, ViewMode } from '../../services/dashboard/collection.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
  currentViewMode: ViewMode = 'grid';
  showAddCollectionModal = false;

  constructor(private collectionService: CollectionService) {
    this.collectionService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }

  setGridView(): void {
    this.collectionService.setViewMode('grid');
  }

  setListView(): void {
    this.collectionService.setViewMode('list');
  }

  openAddCollectionModal(): void {
    this.showAddCollectionModal = true;
  }

  closeAddCollectionModal(): void {
    this.showAddCollectionModal = false;
  }

  onSaveCollection(collectionData: any): void {
    // Here you would typically save the collection to your backend
    console.log('New collection data:', collectionData);
    // For now, we'll just close the modal
    this.closeAddCollectionModal();
  }
}
