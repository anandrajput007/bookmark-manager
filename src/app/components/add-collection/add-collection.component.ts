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
  searchForm: FormGroup;
  selectedIcon: string = 'fa-folder';
  showIconPicker: boolean = false;
  
  iconsPerPage = 36;
  currentPage = 0;

  // Available icons for picker
  availableIcons = FONT_AWESOME_ICONS;

  constructor(private fb: FormBuilder) {
    this.collectionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      icon: ['fa-folder', Validators.required]
    });

    this.searchForm = this.fb.group({
      search: ['']
    });

    // Listen to search changes
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.currentPage = 0;
    });
  }

  get iconSearch(): string {
    return this.searchForm.get('search')?.value || '';
  }

  get filteredIcons(): string[] {
    const searchTerm = this.iconSearch.trim();
    if (!searchTerm) {
      return this.availableIcons;
    }
    return this.availableIcons.filter(icon => 
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  get pagedIcons(): string[] {
    const start = this.currentPage * this.iconsPerPage;
    return this.filteredIcons.slice(start, start + this.iconsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredIcons.length / this.iconsPerPage);
  }

  openModal(): void {
    this.isOpen = true;
    this.collectionForm.reset({ icon: 'fa-folder' });
    this.searchForm.reset();
    this.selectedIcon = 'fa-folder';
    this.showIconPicker = false;
    this.currentPage = 0;
  }

  close(): void {
    this.isOpen = false;
    this.showIconPicker = false;
    this.closeModal.emit();
  }

  toggleIconPicker(): void {
    this.showIconPicker = !this.showIconPicker;
    if (this.showIconPicker) {
      this.searchForm.reset();
      this.currentPage = 0;
    }
  }

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.collectionForm.patchValue({ icon });
    this.showIconPicker = false; // Hide picker after selection
    this.searchForm.reset();
    this.currentPage = 0;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
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

  // Close modal when clicking outside
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
