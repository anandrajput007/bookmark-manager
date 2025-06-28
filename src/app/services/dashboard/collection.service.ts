import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MOCK_COLLECTIONS } from '../../shared/data/collections';

export interface Bookmark {
  Name: string;
  Url: string;
  IsFav: boolean;
  Icon: string;
  CreatedDate: string;
}

export interface Collection {
  Name: string;
  CreatedDate: string;
  IsFav: boolean;
  Icon: string;
  Bookmarks: Bookmark[];
  IsExpanded?: boolean; // For tree view functionality
}

export type ViewMode = 'grid' | 'list';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private viewModeSubject = new BehaviorSubject<ViewMode>('grid');
  public viewMode$ = this.viewModeSubject.asObservable();

  constructor() {}

  getCollections(): Observable<Collection[]> {
    return of(MOCK_COLLECTIONS);
  }

  setViewMode(mode: ViewMode): void {
    this.viewModeSubject.next(mode);
  }

  getViewMode(): ViewMode {
    return this.viewModeSubject.value;
  }

  toggleCollectionExpansion(collection: Collection, collections: Collection[]): void {
    // Close all other collections first
    collections.forEach(col => {
      if (col !== collection) {
        col.IsExpanded = false;
      }
    });
    // Toggle the clicked collection
    collection.IsExpanded = !collection.IsExpanded;
  }
}
