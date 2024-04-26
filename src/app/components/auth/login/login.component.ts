import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DjangoResponse } from '../interfaces/DjangoResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mailTypeError: boolean = false;
  generalError: boolean = false;

  constructor(private auth: AuthService) {}

  loginUser() {
    this.auth.loginUser(this.email, this.password).subscribe({
      next: (resp: DjangoResponse) => {
        console.log('this is my repsonse: ', resp);
      },
      error: (err: HttpErrorResponse) => {
        this.checkError();
      },
    });
  }


  checkError(){
    if(!this.email.includes('@')){
      this.mailTypeError = true;
    }
    else{
      this.mailTypeError = false;
      this.generalError = true;
    }
  }
}
