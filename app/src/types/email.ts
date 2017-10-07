export class Email {
  private _email: string;

  static validate(email: string): boolean {
    const regexp: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regexp.test(email);
  }

  constructor(email: string) {
    this._email = email;
  }

  get value(): string {
    return this._email.trim();
  }

  get valid(): boolean {
    return Email.validate(this._email);
  }
}
