import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  get(key: string): any {
    return JSON.parse(localStorage.getItem('key'));
  }

  put(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}

export const STORAGE_KEYS = {
  USER: 'USER_AUTH'
}
