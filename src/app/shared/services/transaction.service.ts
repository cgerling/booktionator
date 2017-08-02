import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()
export class TransactionService {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  buy(offerUid: string, bookUid: string, userUid: string): Observable<any> {
    return this.http.post(`https://booktionator.firebaseapp.com/api/buy`, {
      offer: offerUid,
      book: bookUid,
      user: userUid
    });
  }
}
