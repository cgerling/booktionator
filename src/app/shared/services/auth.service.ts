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

  logout(): void {
    this.authFirebase.auth.signOut();
  }

  register(name: string, email: Email, password: string, postalcode: PostalCode, phone: Phone): Promise<void> {
    let self = this, newUser;
    return new Promise(function executor(resolve, reject) {
      self.authFirebase.auth.createUserWithEmailAndPassword(email.value, password).then(function creationSuccess(user: User) {
        newUser = user;
        return user.updateProfile({ displayName: name, photoURL: undefined });
      }).then(function updateSuccess() {
        newUser.sendEmailVerification();
        self.dbFirebase.object('/users/' + newUser.uid).set({ name, postalcode, phone }).then(resolve);
      }).catch(reject);
    });
  }

  requestPasswordReset(email: Email): Promise<any> {
    if (!email.valid) return;
    return this.authFirebase.auth.sendPasswordResetEmail(email.value);
  }

  isLogged(): boolean {
    return this.currentUser() !== null;
  }

  currentUser(): User {
    return this.authFirebase.auth.currentUser;
  }

  onAuthStateChanged(nextOrObserver: object, error = (a: FirebaseError) => { }, completed = () => { }): Function {
    return this.authFirebase.auth.onAuthStateChanged(nextOrObserver, error, completed);
  }

  verifyPasswordResetCode(code: string): Promise<any> {
    return this.authFirebase.auth.verifyPasswordResetCode(code);
  }

  resetPassword(code: string, newPassword: string): Promise<any> {
    return this.authFirebase.auth.confirmPasswordReset(code, newPassword);
  }
}
