import { Injectable } from '@angular/core';

import { StorageService, STORAGE_KEYS } from 'app/shared/services/storage.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { Promise, User } from 'firebase/app';

@Injectable()
export class AuthService {
  private authFirebase: AngularFireAuth;
  private storage: StorageService;

  constructor(authFirebase: AngularFireAuth, storage: StorageService) {
    this.authFirebase = authFirebase;
    this.storage = storage;
  }

  login(email: string, password: string): Promise<User> {
    return this.authFirebase.auth.signInWithEmailAndPassword(email, password);
  }

  isLogged(): boolean {
    return this.currentUser() !== null;
  }

  currentUser(): User {
    return this.authFirebase.auth.currentUser;
  }
}
