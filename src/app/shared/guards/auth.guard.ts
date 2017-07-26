import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.isLogged();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.isLogged();
  }

  canLoad(route: Route): Promise<boolean> {
    return this.isLogged();
  }

  private isLogged(): Promise<boolean> {
    return this.auth.isLogged();
  }
}
