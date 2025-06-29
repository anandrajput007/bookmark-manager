import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ViewMode = 'grid' | 'list';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  private viewModeSubject = new BehaviorSubject<ViewMode>('grid');
  public viewMode$ = this.viewModeSubject.asObservable();

  constructor() {
    // Load saved view mode from localStorage if available
    const savedViewMode = localStorage.getItem('bookmarkViewMode') as ViewMode;
    if (savedViewMode && ['grid', 'list'].includes(savedViewMode)) {
      this.viewModeSubject.next(savedViewMode);
    }
  }

  /**
   * Set the current view mode
   */
  setViewMode(mode: ViewMode): void {
    this.viewModeSubject.next(mode);
    localStorage.setItem('bookmarkViewMode', mode);
  }

  /**
   * Get the current view mode
   */
  getViewMode(): ViewMode {
    return this.viewModeSubject.value;
  }

  /**
   * Toggle between grid and list view
   */
  toggleViewMode(): void {
    const currentMode = this.viewModeSubject.value;
    const newMode: ViewMode = currentMode === 'grid' ? 'list' : 'grid';
    this.setViewMode(newMode);
  }
} 