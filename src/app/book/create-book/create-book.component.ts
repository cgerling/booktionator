import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFireDatabase } from 'angularfire2/database';

import { GoogleBooks } from 'app/shared/services/googleBooks.service';

import { Book } from 'types/book';

@Component({
  selector: 'create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {
  title: string;
  author: string;
  date: Date;
  publisher: string;
  description: string;
  imageUrl: string;

  private database: AngularFireDatabase;
  private http: Http;
  private api: GoogleBooks;

  constructor(http: Http, database: AngularFireDatabase, api: GoogleBooks) {
    this.api = api;
    this.database = database;
    this.http = http;
  }

  save(): void {
    this.api.volume(this.title).subscribe((result) => {
      const volume = result.json();
      const imageDefault = '/assets/logo.png';
      const book = volume.items && volume.items.length > 0 ? volume.items[0] : imageDefault;
      const imageUrl = book.imageLinks ? book.imageLinks.thumbnail ? book.imageLinks.thumbnail : imageDefault : imageDefault;

      this.database.list('/books').push({
        title: this.title,
        author: this.author,
        date: this.date.toJSON(),
        score: 0,
        publisher: this.publisher,
        description: this.description,
        imageUrl: imageUrl
      });
    });
  }
}
