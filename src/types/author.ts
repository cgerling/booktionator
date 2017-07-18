export class Author {
  private _uuid: string;
  private _name: string;

  static validate(uuid: string, name: string): boolean {
    return uuid !== '' && name !== '';
  }

  constructor(uuid: string, name: string) {
    this._uuid = uuid;
    this._name = name;
  }

  get uuid(): string {
    return this._uuid;
  }

  get name(): string {
    return this._name;
  }

  get valid(): boolean {
    return Author.validate(this._uuid, this.name);
  }
}

