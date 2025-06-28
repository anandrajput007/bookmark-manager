import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'aj-icon-picker',
  templateUrl: './aj-icon-picker.component.html',
  styleUrls: ['./aj-icon-picker.component.scss']
})
export class AjIconPickerComponent {
  @Input() data: string[] = [];
  @Input() enableNavigation: boolean = true;
  @Input() initialValue: string = '';
  @Output() iconSelected = new EventEmitter<string>();

  searchForm: FormGroup;
  selectedIcon: string = '';
  showIconPicker: boolean = false;

  iconsPerPage = 36;
  currentPage = 0;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });

    // Listen to search changes
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.currentPage = 0;
    });
  }

  ngOnInit(): void {
    if (this.initialValue) {
      this.selectedIcon = this.initialValue;
    }
  }

  get iconSearch(): string {
    return this.searchForm.get('search')?.value || '';
  }

  get filteredIcons(): string[] {
    const searchTerm = this.iconSearch.trim();
    if (!searchTerm) {
      return this.data;
    }
    return this.data.filter(icon => 
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  get pagedIcons(): string[] {
    if (!this.enableNavigation) {
      return this.filteredIcons;
    }
    const start = this.currentPage * this.iconsPerPage;
    return this.filteredIcons.slice(start, start + this.iconsPerPage);
  }

  get totalPages(): number {
    if (!this.enableNavigation) {
      return 1;
    }
    return Math.ceil(this.filteredIcons.length / this.iconsPerPage);
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
    this.iconSelected.emit(icon);
    this.showIconPicker = false;
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

  setSelectedIcon(icon: string): void {
    this.selectedIcon = icon;
  }
}
