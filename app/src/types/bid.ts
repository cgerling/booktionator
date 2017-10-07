export class Bid {
  private _at: Date;
  private _value: string;
  
  constructor(at: Date, value: string) {
    this._at = at;
    this._value = value;
  }
  
  get at(): Date {
    return this._at;
  }
  
  get value(): string {
    return this._value;
  }
}