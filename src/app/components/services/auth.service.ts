import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { VerifyForm } from '../interfaces/VerifyForm.interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginForm } from '../interfaces/LoginForm.interface';
import { DjangoResponse } from '../interfaces/DjangoResponse.interface';
import { PasswordResetMail } from '../interfaces/PasswordResetMail.interface';
import { PasswordReset } from '../interfaces/PasswordReset.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userToken: string = '';
  private registerUrl = 'http://127.0.0.1:8000/register/';
  private verifyUrl = `http://127.0.0.1:8000/verify-email/`;
  private loginUrl = 'http://127.0.0.1:8000/login';
  private passwordResetUrl = 'http://127.0.0.1:8000/password-reset'
  private setPasswordUrl = 'http://127.0.0.1:8000/set-password'
  private refreshTokenUrl = 'http://127.0.0.1:8000/token/refresh/'
  private logoutUrl = 'http://127.0.0.1:8000/logout/'

  registerUser(fullName: string, email: string, pwd1: string): Observable<any> {
    const data: RegisterForm = {
      username: email,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    return this.http.post<DjangoResponse>(this.registerUrl, data);
  }

  refreshJWT(){
    const token = localStorage.getItem('refresh_token');

    return this.http.post<DjangoResponse>(this.refreshTokenUrl, {refresh: token})
  }

  verifyUser(token: string) {
    const data: VerifyForm = {
      token: token,
    };

    return this.http.post<DjangoResponse>(this.verifyUrl, data);
  }

  loginUser(email: string, password: string) {
    const data: LoginForm = {
      email: email,
      password: password,
    };

    return this.http.post<DjangoResponse>(this.loginUrl, data);
  }

  logoutUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };


    return this.http.post<DjangoResponse>(this.logoutUrl, {}, httpOptions)
  }

  sendPasswordResetLink(email: string){
    const data: PasswordResetMail = {
      email: email
    };

    return this.http.post<DjangoResponse>(this.passwordResetUrl, data);
  }

  setNewPassword(token: string, password: string){
    const data: PasswordReset = {
      token: token,
      password: password
    }

    return this.http.post<DjangoResponse>(this.setPasswordUrl, data)
  }
}
