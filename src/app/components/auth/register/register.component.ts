import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DjangoResponse } from '../../interfaces/DjangoResponse.interface';
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
  pwdMatchError: boolean = false;

  userExistsError: boolean = false;
  showRegisterForm: boolean = true;
  creatingAccountAnimation: boolean = false;
  accountCreated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    if (this.passwordMatches()) {
      this.authService
        .registerUser(this.fullName, this.email, this.pwd1)
        .subscribe({
          next: (response: DjangoResponse) => {
            this.showSuccessOnUI();

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
    this.switchAccountCreationToSuccess();
    this.showAccountCreated();
  }

  showAccountCreated() {
    setTimeout(() => {
      this.creatingAccountAnimation = false;
    }, 4000);
    this.accountCreated = true;
  }

  switchAccountCreationToSuccess() {
    this.emailTypeError = false;
    this.pwdMatchError = false;
    this.userExistsError = false;
    this.showRegisterForm = false;
    this.creatingAccountAnimation = true;
  }

  ngOnDestroy() {}
}
