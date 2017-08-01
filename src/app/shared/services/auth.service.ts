import { Injectable } from '@angular/core';

import { StorageService, STORAGE_KEYS } from 'app/shared/services/storage.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promise as FirebasePromise, User, FirebaseError } from 'firebase/app';
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

  login(email: string, password: string): FirebasePromise<User> {
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

  requestPasswordReset(email: Email): FirebasePromise<any> {
    if (!email.valid) return;
    return this.authFirebase.auth.sendPasswordResetEmail(email.value);
  }

  async isLogged(): Promise<boolean> {
    let user: User = await this.currentUser();
    return user !== null;
  }

  async currentUser(): Promise<User> {
    let self = this;
    return new Promise<User>(function resolver(resolve) {
      self.authFirebase.auth.onAuthStateChanged((user: User) => {
        resolve(user);
      });
    });
  }

  updateUser(email?: Email, password?: string, postalcode?: PostalCode, phone?: Phone): Promise<any> {
    return this.currentUser().then((user: User) => {
      let promises = [];
      if (email && email.value.trim() !== '' && email.value !== user.email)
        promises.push(user.updateEmail(email.value));

      if (password && password.trim() !== '')
        promises.push(user.updatePassword(password));

      promises.push(this.dbFirebase.object(`/users/${user.getIdToken()}`).update({
        postalcode: postalcode.value.trim() !== '' ? postalcode.value : undefined,
        phone: phone.value.trim() !== '' ? phone.value : undefined
      }));

      return Promise.all(promises);
    })
  }

  onAuthStateChanged(nextOrObserver: object, error = (a: FirebaseError) => { }, completed = () => { }): Function {
    return this.authFirebase.auth.onAuthStateChanged(nextOrObserver, error, completed);
  }

  verifyPasswordResetCode(code: string): FirebasePromise<any> {
    return this.authFirebase.auth.verifyPasswordResetCode(code);
  }

  resetPassword(code: string, newPassword: string): FirebasePromise<any> {
    return this.authFirebase.auth.confirmPasswordReset(code, newPassword);
  }

  verifyEmail(code: string): FirebasePromise<any> {
    return this.authFirebase.auth.applyActionCode(code);
  }
}
