import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { VerifyForm } from '../interfaces/VerifyForm.interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginForm } from '../interfaces/LoginForm.interface';
import { DjangoResponse } from '../interfaces/DjangoResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userToken: string = '';
  private registerUrl = 'http://127.0.0.1:8000/api/register/';
  private verifyUrl = `http://127.0.0.1:8000/verify-email/`;
  private loginUrl = 'http://126.0.0.1:8000/login';

  registerUser(fullName: string, email: string, pwd1: string): Observable<any> {
    const data: RegisterForm = {
      username: `user-${email}`,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    return this.http.post<DjangoResponse>(this.registerUrl, data);
  }

  verify_user(token: string) {
    const data: VerifyForm = {
      token: token,
    };

    return this.http.post<DjangoResponse>(this.verifyUrl, data);
  }

  login_user(email: string, password: string) {
    const data: LoginForm = {
      email: email,
      password: password,
    };

    return this.http.post<DjangoResponse>(this.loginUrl, data);
  }
}
