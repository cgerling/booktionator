import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from 'app/../types/book';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent {

  @Input()
  books: Book[];

  constructor() {
    this.books = [];
  }
  
}
