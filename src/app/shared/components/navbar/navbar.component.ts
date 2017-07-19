import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private auth: AuthService;
  private router: Router;

  private routeSubs: Subscription;

  @Input()
  withSearch: boolean;

  showSignUp: boolean;
  showSignIn: boolean;
  isLogged: boolean;

  actualPage: string;
  loggedUser: string;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;

    this.withSearch = true;
  }

  ngOnInit(): void {
    this.withSearch = this.withSearch.toString() === 'true';

    this.updateButtons(this.router.url);
    this.updateUser();

    this.routeSubs = this.router.events.subscribe(this.routeHandle.bind(this));
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }

  private routeHandle(value): void {
    this.updateButtons(value.url || value.route.path);
    this.updateUser();
  }

  private updateButtons(route: string): void {
    let routeSplitted = route.split('/');
    route = routeSplitted[routeSplitted.length - 1];

    if (route === 'login') {
      this.showSignIn = false;
      this.showSignUp = true;
    } else if (route === 'register') {
      this.showSignIn = true;
      this.showSignUp = false;
    } else {
      this.showSignIn = this.showSignUp = true;
    }
  }

  private updateUser(): void {
    this.isLogged = this.auth.isLogged();
    this.loggedUser = this.isLogged ? this.auth.currentUser().displayName.split(' ')[0] : undefined;
  }
}
