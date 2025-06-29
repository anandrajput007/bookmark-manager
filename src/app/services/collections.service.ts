import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Bookmark {
  bookmarkId: number;
  collectionId: number;
  name: string;
  url: string;
  icon: string;
  isFav: boolean;
  createdDate: string;
  createdBy: number;
  collectionName: string;
}

export interface Collection {
  collectionId: number;
  name: string;
  icon: string;
  isFav: boolean;
  createdDate: string;
  createdBy: number;
  bookmarkCount: number;
  bookmarks: Bookmark[];
  isExpanded?: boolean; // For UI state management
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private readonly apiUrl = `${environment.apiUrl}/api/Collections`;
  private collectionsSubject = new BehaviorSubject<Collection[]>([]);
  public collections$ = this.collectionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all collections from the API
   */
  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/all`).pipe(
      tap(collections => {
        this.collectionsSubject.next(collections);
      }),
      catchError(error => {
        console.error('Error fetching collections:', error);
        throw error;
      })
    );
  }

  /**
   * Get collections from cache or API
   */
  getCollections(): Observable<Collection[]> {
    const currentCollections = this.collectionsSubject.value;
    if (currentCollections.length > 0) {
      return this.collections$;
    }
    return this.getAllCollections();
  }

  /**
   * Force refresh collections from API
   */
  refreshCollections(): Observable<Collection[]> {
    return this.getAllCollections();
  }

  /**
   * Create a new collection
   */
  createCollection(collection: Omit<Collection, 'collectionId' | 'bookmarkCount' | 'bookmarks' | 'createdBy'>): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/create`, collection).pipe(
      tap(newCollection => {
        const currentCollections = this.collectionsSubject.value;
        this.collectionsSubject.next([...currentCollections, newCollection]);
      }),
      catchError(error => {
        console.error('Error creating collection:', error);
        throw error;
      })
    );
  }

  /**
   * Update an existing collection
   */
  updateCollection(id: number, collection: Partial<Collection>): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${id}`, collection).pipe(
      tap(updatedCollection => {
        const currentCollections = this.collectionsSubject.value;
        const updatedCollections = currentCollections.map(col => 
          col.collectionId === id ? { ...col, ...updatedCollection } : col
        );
        this.collectionsSubject.next(updatedCollections);
      }),
      catchError(error => {
        console.error('Error updating collection:', error);
        throw error;
      })
    );
  }

  /**
   * Delete a collection
   */
  deleteCollection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentCollections = this.collectionsSubject.value;
        const filteredCollections = currentCollections.filter(col => col.collectionId !== id);
        this.collectionsSubject.next(filteredCollections);
      }),
      catchError(error => {
        console.error('Error deleting collection:', error);
        throw error;
      })
    );
  }

  /**
   * Toggle collection expansion state
   */
  toggleCollectionExpansion(collection: Collection): void {
    const currentCollections = this.collectionsSubject.value;
    const updatedCollections = currentCollections.map(col => {
      if (col.collectionId === collection.collectionId) {
        return { ...col, isExpanded: !col.isExpanded };
      }
      return { ...col, isExpanded: false }; // Close other collections
    });
    this.collectionsSubject.next(updatedCollections);
  }

  /**
   * Clear collections cache
   */
  clearCache(): void {
    this.collectionsSubject.next([]);
  }
} 