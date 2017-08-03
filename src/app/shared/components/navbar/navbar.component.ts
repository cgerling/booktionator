import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private activated: string;

  private links: { [key: string]: { path: string, params: object } };
  private router: Router;

  constructor(router: Router) {
    this.router = router;
    this.activated = '';
    this.links = {
      'search': {
        path: 'book/search',
        params: {
          queryParams: {
            mode: 'find'
          }
        }
      },
      'add': {
        path: 'book/search',
        params: {
          queryParams: {
            mode: 'sell'
          }
        }
      },
      'history': {
        path: '/user/history',
        params: {}
      }
    };
  }

  activate(selected: string): void {
    this.activated = selected;
    let route = this.links[selected];

    this.router.navigate([route.path], route.params);
  }

  isActive(name: string): boolean {
    return name === this.activated;
  }
}
