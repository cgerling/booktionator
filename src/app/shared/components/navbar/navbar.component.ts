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

  isLogged: boolean;
  actualPage: string;
  loggedUser: string;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  ngOnInit(): void {
    this.withSearch = (this.withSearch || true).toString() === 'true';

    this.updateUser();

    this.routeSubs = this.router.events.subscribe(this.routeHandle.bind(this));
    this.auth.onAuthStateChanged(this.updateUser.bind(this));
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }

  private routeHandle(value): void {
    this.updateUser();
  }

  private updateUser(): void {
    this.auth.currentUser().then((user) => {
      this.isLogged = user !== null;
      this.loggedUser = this.isLogged ? user.displayName.split(' ')[0] : undefined;
    });
  }
}
