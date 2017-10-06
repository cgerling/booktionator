import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { GoogleBooks } from 'app/shared/services/googleBooks.service';
import { LoaderService } from 'app/shared/services/loader.service';

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

  loading: boolean;

  private database: AngularFireDatabase;
  private http: Http;
  private api: GoogleBooks;
  private router: Router;

  constructor(http: Http, database: AngularFireDatabase, api: GoogleBooks, router: Router) {
    this.api = api;
    this.database = database;
    this.http = http;
    this.router = router;

    this.loading = false;
  }

  save(): void {
    this.loading = true;

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
        image: imageUrl
      }).then(() => {
        this.loading = false;
        this.router.navigate(['/home']);
      });
    });
  }
}
