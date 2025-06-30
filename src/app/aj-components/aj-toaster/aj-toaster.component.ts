import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type ToasterType = 'success' | 'error' | 'warning' | 'information';

export interface ToasterConfig {
  type: ToasterType;
  message: string;
  duration?: number; // in milliseconds, default 15000 (15 seconds)
}

@Component({
  selector: 'aj-toaster',
  templateUrl: './aj-toaster.component.html',
  styleUrls: ['./aj-toaster.component.scss']
})
export class AjToasterComponent implements OnInit, OnDestroy {
  @Input() config!: ToasterConfig;
  @Input() show: boolean = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (this.show && this.config) {
      this.startAutoDismiss();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Start auto-dismiss timer
   */
  private startAutoDismiss(): void {
    const duration = this.config.duration || 15000; // Default 15 seconds
    
    timer(duration)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.show = false;
      });
  }

  /**
   * Get icon class based on toaster type
   */
  getIconClass(): string {
    switch (this.config.type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'information':
        return 'fa-info-circle';
      default:
        return 'fa-info-circle';
    }
  }

  /**
   * Get CSS class based on toaster type
   */
  getToasterClass(): string {
    return `toaster-${this.config.type}`;
  }

  /**
   * Close toaster manually
   */
  close(): void {
    this.show = false;
  }
}
