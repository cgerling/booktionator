export class Phone {
  private _phone: string;

  static validate(phone: string): boolean {
    const regexp: RegExp = /\d{9}/;
    return regexp.test(phone);
  }

  constructor(phone: string) {
    this._phone = phone;
  }

  get value(): string {
    return this._phone.trim();
  }

  get valid(): boolean {
    return Phone.validate(this._phone);
  }
}
