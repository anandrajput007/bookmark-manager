import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
}

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor() {}

  getCollections(): Observable<Collection[]> {
    return of(MOCK_COLLECTIONS);
  }
}
