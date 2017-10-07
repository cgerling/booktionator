import { Bid } from './bid';

export class Auction {
  private _uid: string;
  private _author: string;
  private _at: Date;
  private _due: Date;
  private _bids: [Bid];
  
  constructor(author: string, at: Date, due: Date, uid?: string) {
    this._uid = uid;
    this._author = author;
    this._at = at;
    this._due = due;
  }
  
  get uid(): string {
    return this._uid;
  }
  
  get author(): string {
    return this._author;
  }
  
  get at(): Date {
    return this._at;
  }
  
  get due(): Date {
    return this._due;
  }
  
  get bids(): [Bid] {
    return this._bids;
  }
}