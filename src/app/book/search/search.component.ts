import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchBarComponent } from 'app/shared/components/search-bar/search-bar.component';
import { BookService } from "app/shared/services/book.service";

import { Book } from 'types/book';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private bookService: BookService;
  private route: ActivatedRoute;

  private term: string;
  private mode: string;

  @ViewChild(SearchBarComponent)
  searchBar: SearchBarComponent;

  books: Book[];
  bookLink: string;

  modes: { [key: string]: string };

  constructor(bookService: BookService, route: ActivatedRoute) {
    this.bookService = bookService;
    this.route = route;

    this.modes = {
      'sell': 'book/sell',
      'find': 'book/details'
    }
  }

  ngOnInit(): void {
    let paramsSubs = this.route.params.subscribe((params) => {
      this.term = '';

      let { term } = params;
      if (term) {
        this.term = this.searchBar.term = term;
        this.search();
      }
    });

    let queryParamsSubs = this.route.queryParams.subscribe((queryParams) => {
      this.mode = queryParams.mode;

      this.bookLink = this.modes[this.mode];
    });
  }

  search(): void {
    this.bookService.search(this.searchBar.term).subscribe((res) => {
      this.books = res.json().result.map((val) => this.mapBook(val));
    });
  }

  createSearch(): Function {
    return this.search.bind(this);
  }

  private mapBook(value: any): Book {
    const { uid, title, synopsis, author, date, publisher, score, imageUrl } = value;
    return new Book(uid, title, synopsis, author.name._name, new Date(date), publisher, parseInt(score), imageUrl);
  }
}
