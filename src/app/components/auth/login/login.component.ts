import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DjangoResponse } from '../../interfaces/DjangoResponse.interface';
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

  constructor(private auth: AuthService, private router: Router) {}

  loginUser() {
    this.auth.loginUser(this.email, this.password).subscribe({
      next: (resp: DjangoResponse) => {
        if(resp.access && resp.refresh){
          localStorage.setItem('access_token', resp.access);
          localStorage.setItem('refresh_token', resp.refresh);
        }
        this.router.navigateByUrl('/home')
      },
      error: (err: HttpErrorResponse) => {
        this.checkError();
        console.error(err)
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
