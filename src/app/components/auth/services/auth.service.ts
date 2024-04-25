import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { VerifyForm } from '../interfaces/VerifyForm.interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginForm } from '../interfaces/LoginForm.interface';
import { DjangoResponse } from '../interfaces/DjangoResponse.interface';
import { PasswordResetMail } from '../interfaces/PasswordResetMail.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userToken: string = '';
  private registerUrl = 'http://127.0.0.1:8000/api/register/';
  private verifyUrl = `http://127.0.0.1:8000/verify-email/`;
  private loginUrl = 'http://127.0.0.1:8000/login';
  private passwordResetUrl = 'http://127.0.0.1:8000/password-reset'

  registerUser(fullName: string, email: string, pwd1: string): Observable<any> {
    const data: RegisterForm = {
      username: email,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    return this.http.post<DjangoResponse>(this.registerUrl, data);
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

  sendPasswordResetLink(email: string){
    const data: PasswordResetMail = {
      email: email
    };

    return this.http.post<DjangoResponse>(this.passwordResetUrl, data);
  }
}
