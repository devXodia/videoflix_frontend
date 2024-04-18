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

  private registerUrl = 'http://127.0.0.1:8000/api/register/';

  registerUser(fullName: string, email: string, pwd1: string): Observable<any> {
    const data: RegisterForm = {
      username: `user${email}`,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    return this.http.post<any>(this.registerUrl, data);
  }
}
