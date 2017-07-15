import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-toggle',
  templateUrl: './password-toggle.component.html',
  styleUrls: ['./password-toggle.component.scss']
})
export class PasswordToggleComponent {
  private passwordMode: string;
  private passwordType: string;

  constructor() {
    this.passwordMode = 'visibility';
    this.passwordType = 'password';
  }

  togglePassword(): void {
    const visibility = 'visibility', visibility_off = 'visibility_off';
    const text = 'text', password = 'password';

    if (this.passwordType === password) {
      this.passwordMode = visibility_off;
      this.passwordType = text;
    } else if (this.passwordType === text) {
      this.passwordMode = visibility;
      this.passwordType = password;
    }
  }
}
