import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Bookmark } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  private readonly apiUrl = `${environment.apiUrl}/api/Bookmarks`;
  private bookmarksSubject = new BehaviorSubject<Bookmark[]>([]);
  public bookmarks$ = this.bookmarksSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all bookmarks from the API
   */
  getAllBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.apiUrl}/all`).pipe(
      tap(bookmarks => {
        this.bookmarksSubject.next(bookmarks);
      }),
      catchError(error => {
        console.error('Error fetching bookmarks:', error);
        throw error;
      })
    );
  }

  /**
   * Get bookmarks by collection ID
   */
  getBookmarksByCollection(collectionId: number): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.apiUrl}/collection/${collectionId}`).pipe(
      catchError(error => {
        console.error('Error fetching bookmarks by collection:', error);
        throw error;
      })
    );
  }

  /**
   * Create a new bookmark
   */
  createBookmark(bookmark: Omit<Bookmark, 'bookmarkId' | 'createdBy'>): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.apiUrl}/create`, bookmark).pipe(
      tap(newBookmark => {
        const currentBookmarks = this.bookmarksSubject.value;
        this.bookmarksSubject.next([...currentBookmarks, newBookmark]);
      }),
      catchError(error => {
        console.error('Error creating bookmark:', error);
        throw error;
      })
    );
  }

  /**
   * Update an existing bookmark
   */
  updateBookmark(id: number, bookmark: Partial<Bookmark>): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.apiUrl}/${id}`, bookmark).pipe(
      tap(updatedBookmark => {
        const currentBookmarks = this.bookmarksSubject.value;
        const updatedBookmarks = currentBookmarks.map(bm => 
          bm.bookmarkId === id ? { ...bm, ...updatedBookmark } : bm
        );
        this.bookmarksSubject.next(updatedBookmarks);
      }),
      catchError(error => {
        console.error('Error updating bookmark:', error);
        throw error;
      })
    );
  }

  /**
   * Delete a bookmark
   */
  deleteBookmark(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentBookmarks = this.bookmarksSubject.value;
        const filteredBookmarks = currentBookmarks.filter(bm => bm.bookmarkId !== id);
        this.bookmarksSubject.next(filteredBookmarks);
      }),
      catchError(error => {
        console.error('Error deleting bookmark:', error);
        throw error;
      })
    );
  }

  /**
   * Toggle bookmark favorite status
   */
  toggleFavorite(id: number): Observable<Bookmark> {
    return this.http.patch<Bookmark>(`${this.apiUrl}/${id}/toggle-favorite`, {}).pipe(
      tap(updatedBookmark => {
        const currentBookmarks = this.bookmarksSubject.value;
        const updatedBookmarks = currentBookmarks.map(bm => 
          bm.bookmarkId === id ? { ...bm, isFav: updatedBookmark.isFav } : bm
        );
        this.bookmarksSubject.next(updatedBookmarks);
      }),
      catchError(error => {
        console.error('Error toggling bookmark favorite:', error);
        throw error;
      })
    );
  }

  /**
   * Clear bookmarks cache
   */
  clearCache(): void {
    this.bookmarksSubject.next([]);
  }
} 