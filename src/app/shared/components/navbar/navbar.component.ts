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

  actualPage: string;
  isLogged: boolean;
  loggedUser: string;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;

    this.withSearch = true;
  }

  ngOnInit(): void {
    this.withSearch = this.withSearch.toString() === 'true';

    this.updateUser();

    this.routeSubs = this.router.events.subscribe(this.routeHandle.bind(this));
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  navigateToLogin(): void {
    this.router.navigate(['access/login/']);
  }
  
  navigateToRegister(): void {
    this.router.navigate(['access/register/']);
  }

  private routeHandle(value): void {
    let route = value.url || value.route.path;

    this.updateUser();
  }
  
  private updateUser(): void {
    this.isLogged = this.auth.isLogged();
    this.loggedUser = this.isLogged ? this.auth.currentUser().displayName.split(' ')[0] : undefined;
  }
}
