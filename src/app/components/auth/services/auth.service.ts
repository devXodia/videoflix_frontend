import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userToken: string = '';
  private registerUrl = 'http://127.0.0.1:8000/api/register/';
  private verifyUrl = `http://127.0.0.1:8000/verify-email/`;

  registerUser(fullName: string, email: string, pwd1: string): Observable<any> {
    const data: RegisterForm = {
      username: `user-${email}`,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    return this.http.post<any>(this.registerUrl, data);
  }

  verify_user(token: string) {
    const data = {
      token: token,
    };

    return this.http.post<any>(this.verifyUrl, data);
  }
}
