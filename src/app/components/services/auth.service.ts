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
  public loggedIn : boolean = false;
  private baseUrl = 'https://alen-alduk.developerakademie.org/'

  registerUser(fullName: string, email: string, pwd1: string): Observable<any> {
    const data: RegisterForm = {
      username: email,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    return this.http.post<DjangoResponse>(`${this.baseUrl + '/register/'}`, data);
  }

  refreshJWT(){
    const token = localStorage.getItem('refresh_token');

    return this.http.post<DjangoResponse>(`${this.baseUrl + 'token/refresh/'}`, {refresh: token})
  }

  verifyUser(token: string) {
    const data: VerifyForm = {
      token: token,
    };

    return this.http.post<DjangoResponse>(`${this.baseUrl + 'verify-email/'}`, data);
  }

  loginUser(email: string, password: string) {
    const data: LoginForm = {
      email: email,
      password: password,
    };

    return this.http.post<DjangoResponse>(`${this.baseUrl + 'login'}`, data);
  }

  logoutUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    const data = {
      'refresh_token': localStorage.getItem('refresh_token')
    }
  
    return this.http.post<DjangoResponse>(`${this.baseUrl + 'logout/'}`, data, httpOptions)
  }
  

  sendPasswordResetLink(email: string){
    const data: PasswordResetMail = {
      email: email
    };

    return this.http.post<DjangoResponse>(`${this.baseUrl + 'password-reset'}`, data);
  }

  setNewPassword(token: string, password: string){
    const data: PasswordReset = {
      token: token,
      password: password
    }

    return this.http.post<DjangoResponse>(`${this.baseUrl + 'set-password'}`, data)
  }
}
