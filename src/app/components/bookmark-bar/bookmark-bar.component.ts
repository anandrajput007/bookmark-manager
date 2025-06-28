import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection, CollectionService, ViewMode } from '../../services/dashboard/collection.service';

@Component({
  selector: 'app-bookmark-bar',
  templateUrl: './bookmark-bar.component.html',
  styleUrls: ['./bookmark-bar.component.scss']
})
export class BookmarkBarComponent implements OnInit {
  collections: Collection[] = [];
  currentViewMode: ViewMode = 'grid';

  constructor(
    private http: HttpClient,
    private collectionService: CollectionService
  ) {
    this.collectionService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }

  ngOnInit(): void {
    this.http.get<Collection[]>('/api/collections').subscribe(data => {
      this.collections = data;
    });
  }

  toggleFavorite(collection: Collection): void {
    collection.IsFav = !collection.IsFav;
  }

  toggleBookmarkFavorite(bookmark: any): void {
    bookmark.IsFav = !bookmark.IsFav;
  }

  toggleCollectionExpansion(collection: Collection): void {
    this.collectionService.toggleCollectionExpansion(collection, this.collections);
  }
}
