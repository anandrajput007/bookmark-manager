import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToasterConfig, ToasterType } from '../aj-components/aj-toaster/aj-toaster.component';

export interface ToasterItem extends ToasterConfig {
  id: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastersSubject = new BehaviorSubject<ToasterItem[]>([]);
  public toasters$ = this.toastersSubject.asObservable();

  constructor() {}

  /**
   * Show a success toaster
   */
  success(message: string, duration?: number): void {
    this.showToaster({
      type: 'success',
      message,
      duration
    });
  }

  /**
   * Show an error toaster
   */
  error(message: string, duration?: number): void {
    this.showToaster({
      type: 'error',
      message,
      duration
    });
  }

  /**
   * Show a warning toaster
   */
  warning(message: string, duration?: number): void {
    this.showToaster({
      type: 'warning',
      message,
      duration
    });
  }

  /**
   * Show an information toaster
   */
  information(message: string, duration?: number): void {
    this.showToaster({
      type: 'information',
      message,
      duration
    });
  }

  /**
   * Show a custom toaster
   */
  showToaster(config: ToasterConfig): void {
    const toaster: ToasterItem = {
      id: this.generateId(),
      show: true,
      ...config
    };

    const currentToasters = this.toastersSubject.value;
    this.toastersSubject.next([...currentToasters, toaster]);

    // Auto-remove after duration
    const duration = config.duration || 15000;
    setTimeout(() => {
      this.removeToaster(toaster.id);
    }, duration);
  }

  /**
   * Remove a specific toaster
   */
  removeToaster(id: string): void {
    const currentToasters = this.toastersSubject.value;
    const updatedToasters = currentToasters.filter(t => t.id !== id);
    this.toastersSubject.next(updatedToasters);
  }

  /**
   * Clear all toasters
   */
  clearAll(): void {
    this.toastersSubject.next([]);
  }

  /**
   * Generate unique ID for toaster
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 