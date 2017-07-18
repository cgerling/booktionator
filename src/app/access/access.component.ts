import { Component, OnDestroy } from '@angular/core';

import { LoaderService } from 'app/shared/services/loader.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnDestroy {
  loading: boolean;

  private subscriber: Subscription;

  constructor(loaderService: LoaderService) {
    this.loading = false;

    this.subscriber = loaderService.loading$.subscribe(this.onLoad.bind(this));
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  onLoad(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
