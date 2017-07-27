import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';

import { SearchBarComponent } from 'app/shared/components/search-bar/search-bar.component';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private auth: AuthService;
  private router: Router;
  private activatedRoute: ActivatedRoute;

  private routeSubs: Subscription;

  @ViewChild(SearchBarComponent)
  searchBar: SearchBarComponent

  @Input()
  withSearch: boolean;

  isLogged: boolean;
  actualPage: string;
  loggedUser: string;
  mode: string;

  constructor(auth: AuthService, router: Router, activatedRoute: ActivatedRoute) {
    this.auth = auth;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.withSearch = (this.withSearch || true).toString() === 'true';

    this.updateUser();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.mode = params.mode || 'find';
    });

    this.routeSubs = this.router.events.subscribe(this.routeHandle.bind(this));
    this.auth.onAuthStateChanged(this.updateUser.bind(this));
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }

  createSearch(): Function {
    return function search() {
      this.router.navigate(['/book/search/', this.searchBar.term], { queryParams: { mode: this.mode } });
    }.bind(this);
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
