import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User, FirebaseError } from 'firebase/app';

import { Email } from '../../../types/email';
import { PostalCode } from '../../../types/postalcode';
import { Phone } from '../../../types/phone';

@Injectable()
export class AuthService {
  private authFirebase: AngularFireAuth;
  private dbFirebase: AngularFireDatabase;

  constructor(authFirebase: AngularFireAuth, database: AngularFireDatabase) {
    this.authFirebase = authFirebase;
    this.dbFirebase = database;
  }

  login(email: string, password: string): Promise<any> {
    return this.authFirebase.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.authFirebase.auth.signOut();
  }

  register(name: string, email: Email, password: string, postalcode: PostalCode, phone: Phone): Promise<{}> {
    let self = this, newUser: User;
    return new Promise(function executor(resolve, reject) {
      self.authFirebase.auth.createUserWithEmailAndPassword(email.value, password).then(function creationSuccess(user: User) {
        newUser = user;
        return user.updateProfile({ displayName: name, photoURL: undefined });
      }).then(function updateSuccess() {
        newUser.sendEmailVerification();
        self.dbFirebase.object('/users/' + newUser.uid).set({
          name,
          postalcode: postalcode.value,
          phone: phone.value
        }).then(() => { resolve() });
      }).catch(reject);
    });
  }

  requestPasswordReset(email: Email): firebase.Promise<any> {
    if (!email.valid) return;
    return this.authFirebase.auth.sendPasswordResetEmail(email.value);
  }

  async isLogged(): Promise<boolean> {
    let user: User = await this.currentUser();
    return user !== null;
  }

  getUserInformation(): Promise<User> {
    let self = this;
    return new Promise<User>(function resolver(resolve) {
      self.authFirebase.auth.onAuthStateChanged((user: User) => {
        if (!user) return;

        self.dbFirebase.object(`/users/${user.uid}`).subscribe((userDb) => {
          let completeUser = Object.assign({}, user, userDb);
          resolve(completeUser);
        });
      });
    });
  }

  currentUser(): Promise<User> {
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
      if (email && email.value !== '' && email.value !== user.email)
        promises.push(user.updateEmail(email.value));

      if (password && password.trim() !== '')
        promises.push(user.updatePassword(password));

      promises.push(this.dbFirebase.object(`/users/${user.uid}`).update({
        postalcode: postalcode && postalcode.value !== '' ? postalcode.value : undefined,
        phone: phone && phone.value !== '' ? phone.value : undefined
      }));

      return Promise.all(promises);
    })
  }

  onAuthStateChanged(nextOrObserver: any, error = (a: FirebaseError): any => { }, completed = (): any => { }): Function {
    return this.authFirebase.auth.onAuthStateChanged(nextOrObserver, error, completed);
  }

  verifyPasswordResetCode(code: string): Promise<any> {
    return this.authFirebase.auth.verifyPasswordResetCode(code);
  }

  resetPassword(code: string, newPassword: string): Promise<any> {
    return this.authFirebase.auth.confirmPasswordReset(code, newPassword);
  }

  verifyEmail(code: string): Promise<any> {
    return this.authFirebase.auth.applyActionCode(code);
  }
}
