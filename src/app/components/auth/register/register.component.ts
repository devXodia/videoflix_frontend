import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor(private http: AuthService) {}

  createAccount() {
    this.http.handlePostRequest(this.fullName, this.email, this.pwd1);
  }
}
