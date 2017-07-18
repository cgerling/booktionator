import { Injectable } from '@angular/core';

import { StorageService, STORAGE_KEYS } from 'app/shared/services/storage.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promise, User, FirebaseError } from 'firebase/app';
import { Email } from 'types/email';
import { PostalCode } from 'types/postalcode';
import { Phone } from 'types/phone';

@Injectable()
export class AuthService {
  private authFirebase: AngularFireAuth;
  private dbFirebase: AngularFireDatabase;
  private storage: StorageService;

  constructor(authFirebase: AngularFireAuth, database: AngularFireDatabase, storage: StorageService) {
    this.authFirebase = authFirebase;
    this.dbFirebase = database;
    this.storage = storage;
  }

  login(email: string, password: string): Promise<User> {
    return this.authFirebase.auth.signInWithEmailAndPassword(email, password);
  }

  register(name: string, email: Email, password: string, postalcode: PostalCode, phone: Phone): Promise<void> {
    let self = this;
    return new Promise(function executor(resolve, reject) {
      self.authFirebase.auth.createUserWithEmailAndPassword(email.value, password).then(function creationSuccess(user: User) {
        user.updateProfile({ displayName: name, photoURL: undefined }).then(function updateSuccess() {
          user.sendEmailVerification();
          self.dbFirebase.object('/users/' + user.uid).set({ name, postalcode, phone }).then(() => { resolve(undefined); }, reject);
        }).catch(reject);
      }).catch(reject);
    });
  }

  isLogged(): boolean {
    return this.currentUser() !== null;
  }

  currentUser(): User {
    return this.authFirebase.auth.currentUser;
  }
}
