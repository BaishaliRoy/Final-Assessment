import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../Model/user.model';

export interface AuthResponse {
  idToken: string ;
  email: string ;
  refreshToken: string ;
  expiresIn: string ;
  localId: string ;
  registered ?: string ;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token = '' ;
  public currUser = new BehaviorSubject<User>(null) ;

  constructor(private http: HttpClient,
              private router: Router) { }


  toLogIn(usrEmail: string , usrPwd: string): Observable<any> {
    return this.http.post<AuthResponse>('http://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5Jt1bb2ElAdNCyaS4do_CjxAKRZ7uSGs',
      {
        email: usrEmail,
        password: usrPwd,
        returnSecureToken: true

      })
      .pipe(catchError(this.handleError),
      tap((response: AuthResponse) => {
        console.log(response.email);
        const newUSer = new User(response.email, response.localId, response.idToken);
        this.currUser.next(newUSer);
        sessionStorage.setItem('auth', JSON.stringify(newUSer));
        this.token =  response.idToken ;
      })

      );
  }

  toLogOut(): void {
    sessionStorage.removeItem('auth');
    this.router.navigate(['/login']);
    this.token = '' ;
    this.currUser.next(null);

  }

  toAutoLogin(): void {
    const sessionStorageUser: {
      email: string,
      uId: string,
      token: string,
     } = JSON.parse(sessionStorage.getItem('auth')) ;
    // console.log(sessionStorageUser);
    if (!sessionStorageUser) {
      return null ;
    }
    const loggedInUser = new User(sessionStorageUser.email,
                                  sessionStorageUser.uId,
                                  sessionStorageUser.token) ;
    // console.log(loggedInUser.token);
    if (loggedInUser.token) {
      this.currUser.next(loggedInUser);
    }
  }

  private handleError(errorRes: HttpErrorResponse): any {
    console.log(errorRes.error.error.message);
    let errorMessage = 'Unknown error occurred' ;
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS' :
        errorMessage = 'Email already exists' ;
        break;
      case 'INVALID_EMAIL' :
        errorMessage = 'Email is invalid' ;
        break;
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'Email/Password  is incorrect' ;
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'Email/Password  is incorrect' ;
        break;
      }
    return throwError(errorMessage);
  }
}
