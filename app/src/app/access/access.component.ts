import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LoaderService } from '../shared/services/loader.service';
import { AuthService } from '../shared/services/auth.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  loading: boolean;
  private auth: AuthService;
  private loader: LoaderService;
  private route: ActivatedRoute;
  private router: Router;
  private subscriber: Subscription;

  constructor(auth: AuthService, loaderService: LoaderService, route: ActivatedRoute, router: Router) {
    this.auth = auth;
    this.route = route;
    this.router = router;
    this.loader = loaderService;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      let { mode, oobCode } = params;
      let route;

      if (!oobCode) return;

      switch (mode) {
        case 'resetPassword':
          route = '/access/password-reset';
          break;
        case 'recoverEmail':
          break;
        case 'verifyEmail':
          route = '/access/verify-email';
          break;
        default:
        //TODO: show error of invalid url
      }

      this.router.navigate([route, oobCode]);
    });
  }
}
