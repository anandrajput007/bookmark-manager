import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';

export type ModalType = 'default' | 'success' | 'warning' | 'danger';
export type ModalSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'aj-modal',
  templateUrl: './aj-modal.component.html',
  styleUrls: ['./aj-modal.component.scss']
})
export class AjModalComponent implements OnInit, OnDestroy {
  @Input() show: boolean = false;
  @Input() header: string = '';
  @Input() type: ModalType = 'default';
  @Input() size: ModalSize = 'md';
  @Input() showFooter: boolean = true;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() closeOnEsc: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() animation: boolean = true;

  @Output() closeModal = new EventEmitter<void>();
  @Output() backdropClick = new EventEmitter<void>();

  private originalBodyOverflow: string = '';

  ngOnInit(): void {
    this.handleBodyScroll();
  }

  ngOnDestroy(): void {
    this.restoreBodyScroll();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.show && this.closeOnEsc) {
      this.close();
    }
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget && this.closeOnBackdropClick) {
      this.backdropClick.emit();
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  private handleBodyScroll(): void {
    if (this.show) {
      this.originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  }

  private restoreBodyScroll(): void {
    document.body.style.overflow = this.originalBodyOverflow;
  }

  get modalClasses(): string {
    const classes = ['aj-modal'];
    
    if (this.animation) {
      classes.push('aj-modal--animated');
    }
    
    if (this.show) {
      classes.push('aj-modal--show');
    }
    
    return classes.join(' ');
  }

  get modalContentClasses(): string {
    const classes = ['aj-modal__content'];
    
    classes.push(`aj-modal__content--${this.size}`);
    classes.push(`aj-modal__content--${this.type}`);
    
    if (this.animation) {
      classes.push('aj-modal__content--animated');
    }
    
    return classes.join(' ');
  }

  get headerClasses(): string {
    return `aj-modal__header aj-modal__header--${this.type}`;
  }
}
