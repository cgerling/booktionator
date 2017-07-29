import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private activated: string;

  constructor() {
    this.activated = '';
  }

  activate(selected: string): void {
    this.activated = selected;
  }

  isActive(name: string): boolean {
    return name === this.activated;
  }
}
