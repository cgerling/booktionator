import { Component, Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { environment } from '../../../environments/environment';

@Injectable()
export class GoogleBooks {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  volume(q: string): Observable<any> {
    return this.http.get(`${environment.googleBooks.url}/volumes?q=${q}&key=${environment.googleBooks.apiKey}`);
  }
}
