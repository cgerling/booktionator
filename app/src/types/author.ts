export class Author {
  private _uid: string;
  private _name: string;

  static validate(uid: string, name: string): boolean {
    return uid !== '' && name !== '';
  }

  constructor(/*uid: string, */name: string) {
    //this._uid = uid;
    this._name = name;
  }

  get uid(): string {
    return this._uid;
  }

  get name(): string {
    return this._name;
  }

  get valid(): boolean {
    return Author.validate(this._uid, this.name);
  }
}

