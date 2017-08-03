import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../../../../types/book';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent {

  @Input()
  books: Book[];

  @Input()
  link: string;

  constructor() {
    this.books = [];
  }

}
