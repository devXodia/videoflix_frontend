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

  constructor(private authService: AuthService) {}

  registerUser() {
    if (this.pwd1 === this.pwd2) {
      this.authService
        .registerUser(this.fullName, this.email, this.pwd1)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          },
        });
    } else {
      console.error("Passwords don't match.");
    }
  }
}
