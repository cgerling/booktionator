import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
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

  actualPage: string;
  isLogged: boolean;
  loggedUser: string;
  pageRoute: string;
  accessText: string;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;

    this.withSearch = true;
    this.pageRoute = 'access/register';
    this.accessText = 'Sign up';
  }

  ngOnInit(): void {
    this.withSearch = this.withSearch.toString() === 'true';
    this.isLogged = this.auth.isLogged();
    this.loggedUser = this.isLogged ? this.auth.currentUser().displayName : undefined;

    this.updateButton(this.router.url);

    this.routeSubs = this.router.events.subscribe(this.routeHandle.bind(this));
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  navigate(): void {
    this.router.navigate([this.pageRoute]);
  }

  private routeHandle(value: NavigationStart | NavigationEnd | NavigationCancel | NavigationError): void {
    this.updateButton(value.url);
  }

  private updateButton(actualRoute: string): void {
    let route: string[] = actualRoute.split('/');
    let actualPage: string = route[route.length - 1];

    if (actualPage === 'login') {
      this.accessText = 'Sign up';
      this.pageRoute = 'access/register';
    } else if (actualPage === 'register') {
      this.accessText = 'Sign in';
      this.pageRoute = 'access/login';
    }
  }
}
