import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DjangoResponse } from '../../interfaces/DjangoResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-set-new-password',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.scss',
})
export class SetNewPasswordComponent {
  pwd1: string = '';
  pwd2: string = '';
  token: string = '';
  pwdMatchError: boolean = false;
  showForm: boolean = true;
  showLoading: boolean = false;
  showPasswordChanged: boolean = false;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const token = params['token'];
      this.token = token;
    });
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

  changePassword() {
    if (this.passwordMatches()) {
      this.auth.setNewPassword(this.token, this.pwd1).subscribe({
        next: (resp: DjangoResponse) => {
          this.showSuccessOnUi();
        },
        error: (err: HttpErrorResponse) => {
          console.error('error', err);
        },
      });
    }
  }

  showSuccessOnUi() {
    this.switchToLoading();
    this.switchToDone();
    this.redirectToHome();
  }

  switchToLoading() {
      this.showForm = false;
      this.showLoading = true;
  }

  switchToDone() {
    setTimeout(() => {
      this.showLoading = false;
      this.showPasswordChanged = true;
    }, 3000);
  }

  redirectToHome(){
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 10000)
    
  }
}
