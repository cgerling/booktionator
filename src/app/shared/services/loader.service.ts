import { Injectable } from '@angular/core';

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoaderService {
  private isLoading: Subject<boolean>;

  loading$: Observable<boolean>;

  constructor() {
    this.isLoading = new Subject<boolean>();

    this.loading$ = this.isLoading.asObservable();
  }

  update(loading: boolean): void {
    this.isLoading.next(loading);
  }
}
