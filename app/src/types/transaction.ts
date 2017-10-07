export class Transaction {
  private _uid: string;
  private _from: string;
  private _to: string;
  private _beginAt: Date;
  private _endAt: Date;
  private _product: string;
  private _exchange: string | number;

  constructor(uid: string, from: string, to: string, beginAt: Date, endAt: Date, product: string, exchange: string | number) {
    this._uid = uid;
    this._from = from;
    this._to = to;
    this._beginAt = beginAt;
    this._endAt = endAt;
    this._product = product;
    this._exchange = exchange;
  }

  get uid(): string {
    return this._uid;
  }
  get from(): string {
    return this._from;
  }
  get to(): string {
    return this._to;
  }
  get beginAt(): Date {
    return this._beginAt;
  }
  get endAt(): Date {
    return this._endAt;
  }
  get product(): string {
    return this._product;
  }
  get exchange(): string | number {
    return this._exchange;
  }
}
