import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class TransactionService {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }
  
  buy(offerUid: string, bookUid: string, userUid: string) {
    this.http.post(`https://booktionator.firebaseapp.com/api/buy?offer=${offerUid}&book=${bookUid}&user=${userUid}`, {}).
    subscribe();
  }
}