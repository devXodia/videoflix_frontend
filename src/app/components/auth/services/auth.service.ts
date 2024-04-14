import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForm.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  handlePostRequest(fullName: string, email: string, pwd1: string) {
    const url = 'http://127.0.0.1:8000/api/register/';
    const data: RegisterForm = {
      username: `user${email}`,
      first_name: fullName,
      email: email,
      password: pwd1,
    };

    this.sendPost(url, data);
  }

  sendPost(url: string, data: RegisterForm) {
    this.http.post<RegisterForm>(url, data).subscribe(
      (response) => {
        console.log('Post request successful', response);
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }
}
