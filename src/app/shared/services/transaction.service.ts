import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionService {
  private http: HttpClient;
  
  constructor(http: HttpClient) {
    this.http = http;
  }
  
  buy(offerUid: string, bookUid: string, userUid: string) {
    this.http.post(`https://booktionator.firebaseapp.com/api/buy?offer=${offerUid}&book=${bookUid}&user=${userUid}`, {}).
    subscribe();
  }
}