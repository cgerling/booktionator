import { Author } from 'types/author';

export class Book {
  private _title: string;
  private _synopsis: string;
  private _author: Author;
  private _year: number;
  private _score: number;

  static validate(title: string, year: number): boolean {
    return title !== '' && Number.isInteger(year);
  }

  constructor(title: string, synopsis: string, author: Author, year: number, score: number = 0.0) {
    this._title = title;
    this._synopsis = synopsis;
    this._author = author;
    this._year = year;
    this._score = score;
  }

  get title(): string {
    return this._title;
  }

  get synopsis(): string {
    return this._synopsis;
  }

  get author(): Author {
    return this._author;
  }

  get year(): number {
    return this._year;
  }

  get score(): number {
    return this._score;
  }

  get valid(): boolean {
    return Book.validate(this.title, this.year);
  }
}
