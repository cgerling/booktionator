import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-toggle',
  templateUrl: './password-toggle.component.html',
  styleUrls: ['./password-toggle.component.scss']
})
export class PasswordToggleComponent {
  private _mode: string;
  private _type: string;

  get type(): string {
    return this._type;
  }

  get mode(): string {
    return this._mode;
  }

  constructor() {
    this._mode = 'visibility';
    this._type = 'password';
  }

  toggle(): void {
    const visibility = 'visibility', visibility_off = 'visibility_off';
    const text = 'text', password = 'password';

    if (this.type === password) {
      this._mode = visibility_off;
      this._type = text;
    } else if (this.type === text) {
      this._mode = visibility;
      this._type = password;
    }
  }
}
