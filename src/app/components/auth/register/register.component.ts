import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('register', [
      state(
        'unregistered',
        style({
          backgroundColor: 'rgb(185, 28, 28)',
          transform: 'scale(1.0)',
        })
      ),
      state(
        'registered',
        style({
          backgroundColor: 'rgb(21, 128, 61)',
          opacity: '1',
          transform: 'scale(1.2)',
        })
      ),
      transition('unregistered => registered', [animate('0.15s ease-in-out')]),
      transition('registered => unregistered', [animate('0.1s ease-in-out')]),
    ]),
  ],
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  pwd1: string = '';
  pwd2: string = '';
  emailTypeError: boolean = false;
  pwdMatchError: boolean = false;
  showAnimation: boolean = false;
  userExistsError: boolean = false;

  constructor(private authService: AuthService) {}

  registerUser() {
    console.log('run');
    if (this.passwordMatches()) {
      this.authService
        .registerUser(this.fullName, this.email, this.pwd1)
        .subscribe({
          next: (response) => {
            this.showSuccessOnUI();
            this.resetUI();
          },
          error: (err: HttpErrorResponse) => {
            this.checkTypeError(err);
          },
        });
    } else {
      this.pwdMatchError = true;
    }
  }

  passwordMatches() {
    if (this.pwd1 === this.pwd2) {
      this.pwdMatchError = false;
      return true;
    } else {
      this.pwdMatchError = true;
      return false;
    }
  }

  checkTypeError(err: HttpErrorResponse) {
    if (!this.email.includes('@')) {
      this.emailTypeError = true;
    } else if (
      this.email.includes('@') &&
      err.error.email[0] === 'user with this email already exists.'
    ) {
      this.emailTypeError = false;
      this.userExistsError = true;
    }
  }

  showSuccessOnUI() {
    this.emailTypeError = false;
    this.pwdMatchError = false;
    this.userExistsError = false;
    this.showAnimation = true;
  }

  resetUI() {
    setTimeout(() => {
      this.emailTypeError = false;
      this.pwdMatchError = false;
      this.userExistsError = false;
      this.email = '';
      this.fullName = '';
      this.pwd1 = '';
      this.pwd2 = '';
      this.showAnimation = false;
    }, 8000);
  }

  ngOnDestroy() {
    this.resetUI();
  }
}
