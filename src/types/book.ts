import { Author } from 'types/author';

export class Book {
  private _uid: string;
  private _title: string;
  private _synopsis: string;
  private _author: string;
  private _year: number;
  private _score: number;
  private _imageUrl: string;

  static validate(title: string, year: number): boolean {
    return title !== '' && Number.isInteger(year);
  }

  constructor(uid: string, title: string, synopsis: string = '', author: string, year: number, score: number = 0.0, imageUrl: string = '') {
    this._uid = uid;
    this._title = title;
    this._synopsis = synopsis;
    this._author = author;
    this._year = year;
    this._score = score;
    this._imageUrl = imageUrl;
  }
  
  get uid(): string {
    return this._uid;
  }

  get title(): string {
    return this._title;
  }

  get synopsis(): string {
    return this._synopsis;
  }

  get author(): string {
    return this._author;
  }

  get year(): number {
    return this._year;
  }

  get score(): number {
    return this._score;
  }
  
  get imageUrl(): string {
    return this._imageUrl;
  }

  get valid(): boolean {
    return Book.validate(this.title, this.year);
  }
}
