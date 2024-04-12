import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

interface RegisterForm {
  first_name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  pwd1: string = '';
  pwd2: string = '';

  constructor(private http: HttpClient) {}

  postData() {
    const url = 'http://127.0.0.1:8000/api/register/';
    const data: RegisterForm = {
      first_name: this.fullName,
      email: this.email,
      password: this.pwd1,
    };

    this.sendPost(url, data);
  }

  sendPost(url: string, data: RegisterForm) {
    this.http.post<RegisterForm>(url, data).subscribe(
      (response) => {
        console.log('Post request successful', response);
        // Handle response data here
      },
      (error) => {
        console.error('Error in post request', error);
        // Handle errors here
      }
    );
  }
}
