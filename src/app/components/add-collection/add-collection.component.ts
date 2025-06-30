import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FONT_AWESOME_ICONS } from '../../shared/data/fontawesome-icons';
import { CollectionsService, Collection } from '../../services/collections.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.scss']
})
export class AddCollectionComponent implements OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveCollection = new EventEmitter<any>();

  collectionForm: FormGroup;
  selectedIcon: string = 'fa-folder';
  error: string | null = null;

  // Available icons for picker
  availableIcons = FONT_AWESOME_ICONS;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private collectionsService: CollectionsService
  ) {
    this.collectionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      icon: ['fa-folder', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Open modal and reset form
   */
  openModal(): void {
    this.isOpen = true;
    this.collectionForm.reset({ name: '', icon: 'fa-folder' });
    this.selectedIcon = 'fa-folder';
    this.error = null;
  }

  /**
   * Close modal
   */
  close(): void {
    this.isOpen = false;
    this.collectionForm.reset({ name: '', icon: 'fa-folder' });
    this.selectedIcon = 'fa-folder';
    this.closeModal.emit();
  }

  /**
   * Handle icon selection
   */
  onIconSelected(icon: string): void {
    this.selectedIcon = icon;
    this.collectionForm.patchValue({ icon });
  }

  /**
   * Save collection
   */
  save(): void {
    if (this.collectionForm.valid) {
      const formValue = this.collectionForm.value;
      const collectionData = {
        name: formValue.name,
        icon: formValue.icon,
        isFav: false,
        createdBy: 1 // Default user ID, you can make this dynamic
      };
      this.saveCollection.emit(collectionData); // Just emit the data, don't call the API
      this.close();
    }
  }
}
