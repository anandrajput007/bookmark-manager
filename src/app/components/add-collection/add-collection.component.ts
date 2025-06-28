import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FONT_AWESOME_ICONS } from '../../shared/data/fontawesome-icons';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.scss']
})
export class AddCollectionComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveCollection = new EventEmitter<any>();

  collectionForm: FormGroup;
  selectedIcon: string = 'fa-folder';

  // Available icons for picker
  availableIcons = FONT_AWESOME_ICONS;

  constructor(private fb: FormBuilder) {
    this.collectionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      icon: ['fa-folder', Validators.required]
    });
  }

  openModal(): void {
    this.isOpen = true;
    this.collectionForm.reset({ icon: 'fa-folder' });
    this.selectedIcon = 'fa-folder';
  }

  close(): void {
    this.isOpen = false;
    this.closeModal.emit();
  }

  onIconSelected(icon: string): void {
    this.selectedIcon = icon;
    this.collectionForm.patchValue({ icon });
  }

  save(): void {
    if (this.collectionForm.valid) {
      const collectionData = {
        Name: this.collectionForm.value.name,
        Icon: this.collectionForm.value.icon,
        CreatedDate: new Date().toISOString().split('T')[0],
        IsFav: false,
        Bookmarks: []
      };
      
      this.saveCollection.emit(collectionData);
      this.close();
    }
  }
}
