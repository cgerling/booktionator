import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoaderService {
  private static instance: LoaderService = null;

  state: BehaviorSubject<boolean>;

  public static getInstance(): LoaderService {
    if (LoaderService.instance === null) {
      LoaderService.instance = new LoaderService();
    }

    return LoaderService.instance;
  }

  constructor() {
    this.state = new BehaviorSubject<boolean>(false);
  }

  setState(isLoading: boolean): void {
    this.state.next(isLoading);
  }
}
