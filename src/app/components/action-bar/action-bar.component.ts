import { Component } from '@angular/core';
import { CollectionService, ViewMode } from '../../services/dashboard/collection.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
  currentViewMode: ViewMode = 'grid';

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
}
