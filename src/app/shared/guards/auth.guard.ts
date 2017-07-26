import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private auth: AuthService;
  private router: Router;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let logged = this.isLogged();
    this.redirect(logged);
    return logged;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let logged = this.isLogged();
    this.redirect(logged);
    return logged;
  }

  canLoad(route: Route): Promise<boolean> {
    let logged = this.isLogged();
    this.redirect(logged);
    return logged;
  }

  private isLogged(): Promise<boolean> {
    return this.auth.isLogged();
  }

  private redirect(logged: Promise<boolean>): void {
    logged.then((isLogged: boolean) => {
      if (!isLogged) {
        this.router.navigate(['access/login']);
      }
    });
  }
}
