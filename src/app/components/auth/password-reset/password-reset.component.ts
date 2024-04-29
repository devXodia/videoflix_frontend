import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DjangoResponse } from '../../interfaces/DjangoResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {

showForm: boolean = true;
showLoading: boolean = false;
showLinkSent: boolean = false;
email: string = '';
emailTypeError: boolean = false;
emailNotFoundError: boolean = false;

constructor(private auth: AuthService) {}


sendPasswordReset(){
  this.auth.sendPasswordResetLink(this.email).subscribe({
    next: (resp: DjangoResponse) => {
      this.showSuccessOnUi();
    }, 
    error: (err: HttpErrorResponse) => {
      this.checkError(err)
    }
  })
}

showSuccessOnUi(){
  this.switchToLoading();
  this.switchToLinkSent();
}

switchToLoading(){
  
    this.showForm = false;
    this.showLoading = true

}

switchToLinkSent(){
  setTimeout( () => {
    this.showLoading = false;
    this.showLinkSent = true;
  }, 5000)
}

checkError(error: HttpErrorResponse){
  if (!this.email.includes('@')) {
    this.emailTypeError = true;
    this.emailNotFoundError = false;
  } 
  else {
    this.emailNotFoundError = true;
    this.emailTypeError = false;
  }
}
}

