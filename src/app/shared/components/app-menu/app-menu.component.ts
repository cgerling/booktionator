import { Component, Input, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { SearchBarComponent } from '../search-bar/search-bar.component';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit, OnDestroy {
  private auth: AuthService;
  private router: Router;
  private activatedRoute: ActivatedRoute;

  private routeSubs: Subscription;

  private links: { [link: string]: { path: string, params: object } };

  isLogged: boolean;
  loggedUser: string;

  constructor(auth: AuthService, router: Router, activatedRoute: ActivatedRoute) {
    this.auth = auth;
    this.router = router;
    this.activatedRoute = activatedRoute;

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

  ngOnInit(): void {
    this.updateUser();

    this.routeSubs = this.router.events.subscribe(this.routeHandle.bind(this));
    this.auth.onAuthStateChanged(this.updateUser.bind(this));
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  redirect(link: string): void {
    let route = this.links[link];

    this.router.navigate([route.path], route.params);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private routeHandle(value: any): void {
    this.updateUser();
  }

  private updateUser(): void {
    this.auth.currentUser().then((user) => {
      this.isLogged = user !== null;
      this.loggedUser = this.isLogged ? user.displayName.split(' ')[0] : undefined;
    });
  }
}
