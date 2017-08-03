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

  isLogged: boolean;
  loggedUser: string;

  constructor(auth: AuthService, router: Router, activatedRoute: ActivatedRoute) {
    this.auth = auth;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
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
