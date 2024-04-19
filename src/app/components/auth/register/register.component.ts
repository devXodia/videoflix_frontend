import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  pwd1: string = '';
  pwd2: string = '';
  emailTypeError: boolean = false;
  accountCreated: boolean = false;
  pwdMatchError: boolean = false;

  constructor(private authService: AuthService) {}

  registerUser() {
    if (this.passwordMatches()) {
      this.authService
        .registerUser(this.fullName, this.email, this.pwd1)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.showSuccessOnUI();
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            this.checkTypeError();
          },
        });
    } else {
      this.pwdMatchError = true;
    }
  }

  passwordMatches() {
    if (this.pwd1 === this.pwd2) {
      return true;
    } else {
      return false;
    }
  }

  checkTypeError() {
    if (!this.email.includes('@')) {
      this.emailTypeError = true;
    } else {
      this.emailTypeError = false;
    }
    this.accountCreated = false;
  }

  showSuccessOnUI() {
    this.emailTypeError = false;
    this.accountCreated = true;
  }
}
