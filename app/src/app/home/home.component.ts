import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { Book } from '../../types/types';

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
    this.dbFirebase.list('books', (ref) => ref.orderByChild('score').limitToLast(12)).valueChanges().subscribe(values => {
      self.books = values.map(value => {
        return <Book>{
          uid: value['$key'],
          title: value['title'],
          description: value['description'],
          author: value['author'],
          date: new Date(value['date']),
          publisher: value['publisher'],
          score: value['score'],
          image: value['image']
        };
      }).sort((v1, v2) => (v1.score < v2.score) ? 1 : (v1.score > v2.score) ? -1 : 0);
    });
  }
}
