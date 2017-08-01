import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFireDatabase } from 'angularfire2/database';

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

  private database: AngularFireDatabase;
  private http: Http;

  constructor(http: Http, database: AngularFireDatabase) {
    this.database = database;
    this.http = http;
  }

  save(): void {
    //TODO: Google Books API integration

    this.database.list('/books').push({
      title: this.title,
      author: this.author,
      date: this.date,
      score: 0,
      publisher: this.publisher,
      description: this.description
    });
  }
}
