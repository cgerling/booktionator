export class Offer {
  private _uid: string;
  private _author: string;
  private _exchange: string;
  private _modality: string;
  
  constructor(author: string, exchange: string, modality: string, uid?: string) {
    this._uid = uid;
    this._author = author;
    this._exchange = exchange;
    this._modality = modality;
  }
  
  get uid(): string {
    return this._uid;
  }
  
  get author(): string {
    return this._author;
  }
  
  get exchange(): string {
    return this._exchange;
  }
  
  get modality(): string {
    return this._modality;
  }
  
  set exchange(exchange: string) {
    this._exchange = exchange;
  }
}