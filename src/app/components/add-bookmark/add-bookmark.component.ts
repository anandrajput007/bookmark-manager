import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FONT_AWESOME_ICONS } from '../../shared/data/fontawesome-icons';
import { CollectionService, Collection } from '../../services/dashboard/collection.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveBookmark = new EventEmitter<any>();

  bookmarkForm: FormGroup;
  selectedIcon: string = 'fa-bookmark';
  collections: Collection[] = [];
  sortedCollections: Collection[] = [];

  // Available icons for picker
  availableIcons = FONT_AWESOME_ICONS;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService
  ) {
    this.bookmarkForm = this.fb.group({
      collectionId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      icon: ['fa-bookmark', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collectionService.getCollections().subscribe(collections => {
      this.collections = collections;
      // Sort collections by name in ascending order
      this.sortedCollections = [...collections].sort((a, b) => 
        a.Name.toLowerCase().localeCompare(b.Name.toLowerCase())
      );
    });
  }

  openModal(): void {
    this.isOpen = true;
    this.bookmarkForm.reset({ icon: 'fa-bookmark' });
    this.selectedIcon = 'fa-bookmark';
  }

  close(): void {
    this.isOpen = false;
    this.closeModal.emit();
  }

  onIconSelected(icon: string): void {
    this.selectedIcon = icon;
    this.bookmarkForm.patchValue({ icon });
  }

  save(): void {
    if (this.bookmarkForm.valid) {
      const selectedCollection = this.collections.find(
        col => col.Name === this.bookmarkForm.value.collectionId
      );

      const bookmarkData = {
        Name: this.bookmarkForm.value.name,
        Url: this.bookmarkForm.value.url,
        Icon: this.bookmarkForm.value.icon,
        IsFav: false,
        CreatedDate: new Date().toISOString().split('T')[0],
        CollectionName: this.bookmarkForm.value.collectionId
      };
      
      this.saveBookmark.emit(bookmarkData);
      this.close();
    }
  }
}
