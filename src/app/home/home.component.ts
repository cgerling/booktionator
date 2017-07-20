import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Book } from '../../types/book';
import { Author } from '../../types/author';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  private auth: AuthService;
  private router: Router;
  
  private dbFirebase: AngularFireDatabase;
  
  private books: Book[];
  
  constructor(auth: AuthService, router: Router, db: AngularFireDatabase) {
    this.auth = auth;
    this.router = router;
    this.dbFirebase= db;
    this.books = [];
  }
  
  ngOnInit(): void {
    let self = this;
    this.dbFirebase.list('books', {
      query: {
        orderByChild: 'score',
        limtiToLast: 10
      }
    }).subscribe(values => { for (let value of values) {
      self.books.push(new Book(value.$key, value.title, value.synopsis, value.author.name._name, value.year, value.score, value.imageUrl));
     }});
  }
  
  navigate(value): void {
    this.router.navigate([`books/${value}`]);
  }
}
