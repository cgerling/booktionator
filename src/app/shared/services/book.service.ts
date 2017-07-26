import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Book } from 'types/book';

@Injectable()
export class BookService {
  private dabatase: AngularFireDatabase;
  private http: Http;

  constructor(http: Http, database: AngularFireDatabase) {
    this.dabatase = database;
    this.http = http;
  }

  search(term: string): Observable<Response> {
    return this.http.get(`https://booktionator.firebaseapp.com/api/search?q=${term}`);
  }
}
