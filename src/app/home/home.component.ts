import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase} from 'angularfire2/database';

import { Book } from '../../types/book';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  private router: Router;

  private dbFirebase: AngularFireDatabase;

  books: Book[];

  constructor(router: Router, db: AngularFireDatabase) {
    this.router = router;
    this.dbFirebase = db;
    this.books = [];
  }

  ngOnInit(): void {
    let self = this;
    this.dbFirebase.list('books', {
      query: {
        orderByChild: 'score',
        limitToLast: 12
      }
    }).subscribe(values => {
      self.books = values.map(value => new Book(value.$key, value.title, value.description, value.author.name._name, new Date(value.date), value.publisher, value.score, value.imageUrl))
        .sort((v1, v2) => (v1.score < v2.score) ? 1 : (v1.score > v2.score) ? -1 : 0);
    });
  }
}
