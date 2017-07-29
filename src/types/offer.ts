export class Offer {
  private _author: string;
  private _exchange: string;
  private _modality: string;
  
  constructor(author: string, exchange: string, modality: string) {
    this._author = author;
    this._exchange = exchange;
    this._modality = modality;
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
}