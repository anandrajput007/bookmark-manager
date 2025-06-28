import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../../services/dashboard/collection.service';

@Component({
  selector: 'app-bookmark-bar',
  templateUrl: './bookmark-bar.component.html',
  styleUrls: ['./bookmark-bar.component.scss']
})
export class BookmarkBarComponent implements OnInit {
  collections: Collection[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Collection[]>('/api/collections').subscribe(data => {
      this.collections = data;
    });
  }

  toggleFavorite(collection: Collection): void {
    collection.IsFav = !collection.IsFav;
  }
}
