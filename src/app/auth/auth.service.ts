import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from 'src/environments/environment';

// interface can be used as data type for reponse. this is optional
export interface authResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(creds) {
    let url =
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;

    return this.http
      .post<authResponse>(url, {
        email: creds.email,
        password: creds.password,
        returnSecureToken: true,
      }).pipe(catchError((errorRes) => this.handleError(errorRes)), tap((resData) => {
        this.handleAuthentication(resData);
      }));
  }

  signIn(creds) {
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAx7U5rFEqcZNTSvDjJZ1gaZ7tSZs6thTI';

    return this.http
      .post<authResponse>(url, {
        email: creds.email,
        password: creds.password,
        returnSecureToken: true,
      }).pipe(catchError((errorRes) => this.handleError(errorRes)),  tap((resData) => {
        this.handleAuthentication(resData);
      })
      )
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    
    const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenValidity);

    if(loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }


  handleAuthentication(resData) {
    const expiry = new Date().setFullYear(new Date().getFullYear() + 1) // creating expiry date for token
    const user = new User(    // creating user object
      resData.email, 
      resData.localId, 
      resData.idToken, 
      expiry 
      ); 
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  // shared error handling fun()
  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error has occured.';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMsg = `This email doesn't exists.`;
        break;

      case 'EMAIL_EXISTS':
        errorMsg = 'This email already exists.';
        break;

      case 'INVALID_PASSWORD':
        errorMsg = 'Incorrect password.';
        break;
    }
    return throwError(errorMsg);
  }
}
