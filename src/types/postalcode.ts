export class PostalCode {
  private _postalCode: string;

  static validate(code: string): boolean {
    const regexp: RegExp = /\d{5}-\d{3}/;
    return regexp.test(code);
  }

  constructor(code: string) {
    this._postalCode = code;
  }

  get value(): string {
    return this._postalCode.trim();
  }

  get valid(): boolean {
    return PostalCode.validate(this._postalCode);
  }
}
