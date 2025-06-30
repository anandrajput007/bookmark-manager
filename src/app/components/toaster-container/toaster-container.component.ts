import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToasterService, ToasterItem } from '../../services/toaster.service';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.scss']
})
export class ToasterContainerComponent implements OnInit, OnDestroy {
  toasters: ToasterItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.toasterService.toasters$
      .pipe(takeUntil(this.destroy$))
      .subscribe(toasters => {
        this.toasters = toasters;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Track by function for ngFor
   */
  trackByToasterId(index: number, toaster: ToasterItem): string {
    return toaster.id;
  }

  /**
   * Remove a specific toaster
   */
  removeToaster(id: string): void {
    this.toasterService.removeToaster(id);
  }
} 